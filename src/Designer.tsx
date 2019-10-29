import { merge } from "lodash";
import * as React from "react";
import { DeepPartial } from "ts-essentials";
import Paper from "./Paper/Paper";
import styleClasses from "./styleClasses";
import "./styles.css";
import ToolBox from "./ToolBox/ToolBox";
import {
  DesignerItem,
  IDesignerProps,
  IImageInfo,
  IPosition,
  IStyleClasses
} from "./types";

interface IDesignerState {
  classes: IStyleClasses;
  items: { [x: string]: DesignerItem };
  lastItemId: number;
  useInternalItems: boolean;
  color: string;
  area: IPosition[];
  mode?: DesignerItem["type"];
  lastImageInfo?: IImageInfo;
  updatingItem?: DesignerItem;
  selectedItem?: DesignerItem;
}

class Designer extends React.Component<IDesignerProps, IDesignerState> {
  public static defaultProps: DeepPartial<IDesignerProps> = {
    itemInitSize: {
      height: 100,
      width: 100
    },
    paperSize: {
      height: 600,
      width: 300
    }
  };

  constructor(props: IDesignerProps) {
    super(props);

    const { classes, drawingArea, paperSize } = this.props;

    let area: IPosition[] = [];

    if (drawingArea) {
      area = drawingArea;
    } else {
      area = [
        {
          left: 0,
          top: 0
        },
        {
          left: paperSize!.width,
          top: 0
        },
        {
          left: paperSize!.width,
          top: paperSize!.height
        },
        {
          left: 0,
          top: paperSize!.height
        }
      ];
    }

    this.state = {
      area,
      classes: merge(classes, styleClasses),
      color: "#ff0000",
      items: {},
      lastItemId: -1,
      useInternalItems: !!props.items
    };
  }

  public componentDidUpdate(prevProps: IDesignerProps) {
    const { useInternalItems } = this.state;
    const { items } = this.props;

    if (!useInternalItems && !prevProps.items && items) {
      this.setState({ useInternalItems: false });
    }
  }

  public render() {
    const {
      classes,
      items,
      area,
      mode,
      updatingItem,
      selectedItem
    } = this.state;

    const { paperSize } = this.props;

    return (
      <div className={classes.designer.wrapper}>
        <ToolBox
          classes={classes.designer.toolbox}
          onAddImage={this.handleAddImage}
          onAddCircle={this.handleAddCircle}
          onAddRectangle={this.handleAddRectangle}
          onAddLine={this.handleAddLine}
          onAddText={this.handleAddText}
          mode={mode}
        />
        <div className={classes.designer.toolOptions.wrapper}>Toolbar</div>
        <Paper
          classes={classes.designer.paper}
          height={paperSize!.height}
          width={paperSize!.width}
          items={items}
          area={area}
          selectedItem={selectedItem}
          onDragItem={this.handleChangeItem}
          onResizeItem={this.handleChangeItem}
          onRotateItem={this.handleChangeItem}
          onRemoveItem={this.handleRemoveItem}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onSelectItem={this.handleSelectItem}
          cursor={mode || updatingItem ? "move" : undefined}
        />
      </div>
    );
  }

  private addItem(item: DesignerItem) {
    const { useInternalItems, lastItemId } = this.state;
    const { onChangeItems } = this.props;

    const items = useInternalItems ? this.state.items : this.props.items;

    const newItem = { ...item, itemId: lastItemId + 1 };

    const newItems = {
      ...items,
      [lastItemId + 1]: newItem
    };

    this.setState({
      items: newItems,
      lastItemId: lastItemId + 1,
      updatingItem: newItem
    });

    if (onChangeItems) {
      onChangeItems(newItems);
    }
  }

  private handleAddImage = (info: IImageInfo) => {
    this.setState({ lastImageInfo: info, mode: "image" });
  };

  private handleAddCircle = () => {
    this.setState({ mode: "circle" });
  };

  private handleAddRectangle = () => {
    this.setState({ mode: "rectangle" });
  };

  private handleAddLine = () => {
    // const { color } = this.state;
    // const { itemInitSize } = this.props;

    // this.addItem({
    //   ables: {
    //     close: true,
    //     color: true,
    //     move: true,
    //     outline: true,
    //     resize: false,
    //     rotate: true
    //   },
    //   outlineColor: color,
    //   outlineWeight: 1,
    //   position: this.generatePosition({ ...itemInitSize!, height: 2 }),
    //   rotate: 0,
    //   type: "line"
    // });
    this.setState({ mode: "line" });
  };

  private handleAddText = () => {
    // const { color } = this.state;

    // this.addItem({
    //   ables: {
    //     close: true,
    //     color: true,
    //     move: true,
    //     outline: false,
    //     resize: false,
    //     rotate: true
    //   },
    //   bold: false,
    //   color,
    //   fontId: 2,
    //   fontName: "Sans Serif",
    //   fontSize: 10,
    //   italic: false,
    //   position: this.generatePosition({ width: 200, height: 10 }),
    //   rotate: 0,
    //   text: "Click to change text",
    //   type: "text",
    //   underline: false
    // });
    this.setState({ mode: "text" });
  };

  private handleChangeItem = (item: DesignerItem) => {
    const { useInternalItems } = this.state;
    const { onChangeItems } = this.props;

    const { items } = useInternalItems ? this.state : this.props;

    if (typeof item.itemId === "undefined") {
      return;
    }

    items[item.itemId] = { ...item };

    if (useInternalItems) {
      this.setState({ items });
    } else {
      onChangeItems(items);
    }
  };

  private handleRemoveItem = (item: DesignerItem) => {
    const { useInternalItems } = this.state;
    const { onChangeItems } = this.props;
    if (typeof item.itemId !== "undefined") {
      const { items } = useInternalItems ? this.state : this.props;

      delete items[item.itemId];

      if (useInternalItems) {
        this.setState({ items, updatingItem: undefined });
      } else {
        this.setState({ updatingItem: undefined }, () => {
          onChangeItems(items);
        });
      }
    }
  };

  private handleSelectItem = (item?: DesignerItem) => {
    this.setState({ selectedItem: item });
  };

  private handleMouseDown = (position: IPosition) => {
    const { mode, color, lastImageInfo } = this.state;

    if (!mode) {
      return;
    }

    const basicItemDetails = {
      ables: {
        close: true,
        color: true,
        move: true,
        outline: true,
        resize: true,
        rotate: true
      },
      naturalSize: { width: 4, height: 4 },
      outlineColor: color,
      outlineWeight: 1,
      position,
      rotate: 0,
      size: { width: 4, height: 4 }
    };

    switch (mode) {
      case "circle":
        this.addItem({
          ...basicItemDetails,
          color: "transparent",
          type: "circle"
        });
        break;
      case "rectangle":
        this.addItem({
          ...basicItemDetails,
          color: "transparent",
          type: "rectangle"
        });
        break;
      case "image":
        this.addItem({
          ...basicItemDetails,
          data: lastImageInfo!.data,
          naturalSize: lastImageInfo!.size,
          type: "image"
        });
        break;
      case "line":
        this.addItem({
          ...basicItemDetails,
          type: "line"
        });
        break;
      default:
        break;
    }

    this.setState({ mode: undefined, lastImageInfo: undefined });
  };
  private handleMouseMove = (position: IPosition) => {
    const { updatingItem, items } = this.state;

    if (updatingItem) {
      if (
        (updatingItem.type === "rectangle" ||
          updatingItem.type === "image" ||
          updatingItem.type === "circle") &&
        typeof updatingItem.itemId === "number"
      ) {
        this.setState({
          items: {
            ...items,
            [updatingItem.itemId]: {
              ...updatingItem,
              size: {
                height: position.top - updatingItem.position.top,
                width: position.left - updatingItem.position.left
              }
            }
          }
        });
      } else if (
        updatingItem.type === "line" &&
        typeof updatingItem.itemId === "number"
      ) {
        this.setState({
          items: {
            ...items,
            [updatingItem.itemId]: {
              ...updatingItem,
              rotate:
                Math.atan2(
                  position.top - updatingItem.position.top,
                  position.left - updatingItem.position.left
                ) *
                (180 / Math.PI),
              size: {
                ...updatingItem,
                width: Math.sqrt(
                  Math.pow(updatingItem.position.left - position.left, 2) +
                    Math.pow(updatingItem.position.top - position.top, 2)
                )
              }
            }
          }
        });
      }
    }
  };
  private handleMouseUp = (position: IPosition) => {
    this.setState({ updatingItem: undefined, mode: undefined });
  };
}

export default Designer;
