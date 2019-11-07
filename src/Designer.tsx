import classnames from "classnames";
import { merge } from "lodash";
import * as React from "react";
import { DeepPartial } from "ts-essentials";
import Paper from "./Paper/Paper";
import styleClasses from "./styleClasses";
import "./styles.css";
import ToolBox from "./ToolBox/ToolBox";
import ToolOptions from "./ToolOptions/ToolOptions";
import {
  BrushItem,
  DesignerItem,
  IDesignerProps,
  IImageInfo,
  IPosition,
  IStyleClasses,
  IFeatures
} from "./types";

interface IDesignerState {
  classes: IStyleClasses;
  items: { [x: string]: DesignerItem };
  lastItemId: number;
  useInternalItems: boolean;
  color: string;
  outlineColor: string;
  outlineWeight: number;
  font: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  area: IPosition[];
  mode?: DesignerItem["type"];
  lastImageInfo?: IImageInfo;
  updatingItem?: DesignerItem;
  selectedItem?: DesignerItem;
  target?: HTMLElement;
}

const defaultFeatures: IFeatures = {
  brush: true,
  circle: true,
  image: true,
  line: true,
  rectangle: true,
  text: true
};

class Designer extends React.Component<IDesignerProps, IDesignerState> {
  public static defaultProps: DeepPartial<IDesignerProps> = {
    fontApiKey: "YOUR_API_KEY",
    paperSize: {
      height: 300,
      width: 600
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
      bold: false,
      classes: merge(classes, styleClasses),
      color: "#ffffff",
      font: "Sans Serif",
      fontSize: 12,
      italic: false,
      items: {},
      lastItemId: -1,
      outlineColor: "#000000",
      outlineWeight: 4,
      underline: false,
      useInternalItems: !props.items
    };
  }

  public componentDidUpdate(prevProps: IDesignerProps) {
    const { useInternalItems } = this.state;
    const { items } = this.props;

    if (useInternalItems && !prevProps.items && items) {
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
      selectedItem,
      color,
      outlineColor,
      font,
      fontSize,
      outlineWeight,
      bold,
      italic,
      underline,
      target
    } = this.state;

    const { paperSize, className, fontApiKey, features } = this.props;

    return (
      <div
        style={{ width: paperSize!.width + 100 }}
        className={classnames(classes.designer.wrapper, className)}
      >
        <ToolBox
          classes={classes.designer.toolbox}
          onAddImage={this.handleAddImage}
          onAddCircle={this.handleAddCircle}
          onAddRectangle={this.handleAddRectangle}
          onAddLine={this.handleAddLine}
          onAddText={this.handleAddText}
          onAddBrush={this.handleAddBrush}
          mode={mode}
          features={{ ...defaultFeatures, ...features }}
        />
        <ToolOptions
          classes={classes.designer.toolOptions}
          fillColor={color}
          outlineColor={outlineColor}
          onChangeFillColor={this.handleChangeFillColor}
          onChangeOutlineColor={this.handleChangeOutlineColor}
          onChangeFont={this.handleChangeFont}
          onChangeFontSize={this.handleChangeFontSize}
          onChangeOutlineWeight={this.handleChangeOutlineWeight}
          onToggleBold={this.handleChangeFontStyle("bold")}
          onToggleUnderline={this.handleChangeFontStyle("underline")}
          onToggleItalic={this.handleChangeFontStyle("italic")}
          fontApiKey={fontApiKey!}
          font={font}
          fontSize={fontSize}
          outlineWeight={outlineWeight}
          bold={bold}
          italic={italic}
          underline={underline}
          mode={mode ? mode : selectedItem ? selectedItem.type : undefined}
        />
        <Paper
          classes={classes.designer.paper}
          height={paperSize!.height}
          width={paperSize!.width}
          items={items}
          area={area}
          selectedItem={selectedItem}
          onChangeItem={this.handleChangeItem}
          onRemoveItem={this.handleRemoveItem}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onSelectItem={this.handleSelectItem}
          onChangeTarget={this.handleChangeTarget}
          cursor={mode || updatingItem ? "move" : undefined}
          target={target}
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
    const { mode } = this.state;

    this.setState({
      lastImageInfo: info,
      mode: mode !== "image" ? "image" : undefined
    });
  };

  private handleAddCircle = () => {
    const { mode } = this.state;
    this.setState({ mode: mode !== "circle" ? "circle" : undefined });
  };

  private handleAddRectangle = () => {
    const { mode } = this.state;
    this.setState({ mode: mode !== "rectangle" ? "rectangle" : undefined });
  };

  private handleAddLine = () => {
    const { mode } = this.state;
    this.setState({ mode: mode !== "line" ? "line" : undefined });
  };

  private handleAddText = () => {
    const { mode } = this.state;
    this.setState({ mode: mode !== "text" ? "text" : undefined });
  };

  private handleAddBrush = () => {
    const { mode } = this.state;
    this.setState({ mode: mode !== "brush" ? "brush" : undefined });
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
    const {
      mode,
      color,
      lastImageInfo,
      outlineColor,
      font,
      italic,
      bold,
      fontSize,
      underline,
      outlineWeight
    } = this.state;

    if (!mode) {
      return;
    }

    const ables = {
      close: true,
      color: true,
      move: true,
      outline: true,
      resize: true,
      rotate: true
    };

    const basicItemDetails = {
      ables: {
        ...ables
      },
      outlineColor,
      outlineWeight,
      position,
      rotate: 0,
      size: { width: 4, height: 4 }
    };

    switch (mode) {
      case "circle":
        this.addItem({
          ...basicItemDetails,
          color,
          type: "circle"
        });
        break;
      case "rectangle":
        this.addItem({
          ...basicItemDetails,
          color,
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
          ables: {
            ...ables
          },
          naturalWidth: 4,
          outlineColor,
          outlineWeight,
          position,
          rotate: 0,
          type: "line",
          width: 4
        });
        break;
      case "text":
        this.addItem({
          ables: {
            ...ables,
            outline: false,
            resize: false
          },
          bold,
          color: outlineColor,
          fontId: 1,
          fontName: font,
          fontSize,
          italic,
          position,
          rotate: 0,
          text: "Click to add a text",
          type: "text",
          underline
        });
        this.setState({ updatingItem: undefined });
        break;
      case "brush":
        this.addItem({
          ables: {
            close: true,
            color: false,
            move: true,
            outline: true,
            resize: false,
            rotate: true
          },
          naturalPosition: position,
          outlineColor,
          outlineWeight,
          position,
          positions: [position],
          rotate: 0,
          type: "brush"
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
        const adjSize = {
          height: position.top - updatingItem.position.top,
          width: position.left - updatingItem.position.left
        };

        this.handleChangeItem({
          ...updatingItem,
          size: adjSize
        });
      } else if (
        updatingItem.type === "line" &&
        typeof updatingItem.itemId === "number"
      ) {
        const adjWidth = Math.sqrt(
          Math.pow(updatingItem.position.left - position.left, 2) +
            Math.pow(updatingItem.position.top - position.top, 2)
        );

        this.handleChangeItem({
          ...updatingItem,
          naturalWidth: adjWidth,
          rotate:
            Math.atan2(
              position.top - updatingItem.position.top,
              position.left - updatingItem.position.left
            ) *
            (180 / Math.PI),
          width: adjWidth
        });
      } else if (
        updatingItem.type === "brush" &&
        typeof updatingItem.itemId === "number"
      ) {
        const item = items[updatingItem.itemId] as BrushItem;
        const lastPosition = item.positions[item.positions.length - 1];

        const slope =
          (position.top - lastPosition.top) /
          (position.left - lastPosition.left);
        const positions: IPosition[] = [];

        if (slope !== Infinity && slope !== -1 * Infinity && !isNaN(slope)) {
          const intercept = lastPosition.top - slope * lastPosition.left;

          if (position.left >= lastPosition.left) {
            for (let x = lastPosition.left; x <= position.left; x++) {
              const y = slope * x + intercept;
              positions.push({ left: x, top: y });
            }
          } else {
            for (let x = lastPosition.left; x >= position.left; x--) {
              const y = slope * x + intercept;
              positions.push({ left: x, top: y });
            }
          }
        } else {
          if (position.top >= lastPosition.top) {
            for (let y = lastPosition.top; y < position.top; y++) {
              positions.push({ left: position.left, top: y });
            }
          } else {
            for (let y = lastPosition.top; y > position.top; y--) {
              positions.push({ left: position.left, top: y });
            }
          }
        }

        const orgPosition = {
          left:
            item.position.left > position.left
              ? position.left
              : item.position.left,
          top:
            item.position.top > position.top ? position.top : item.position.top
        };

        this.handleChangeItem({
          ...updatingItem,
          naturalPosition: orgPosition,
          position: orgPosition,
          positions: [...item.positions, ...positions]
        });
      }
    }
  };

  private handleMouseUp = (/*position: IPosition*/) => {
    this.setState({ updatingItem: undefined, mode: undefined });
  };

  private handleChangeFillColor = (color: string) => {
    const { selectedItem, items } = this.state;

    if (selectedItem && typeof selectedItem.itemId === "number") {
      const modSelectedItem = { ...items[selectedItem.itemId as number] };

      if (
        modSelectedItem.type === "circle" ||
        modSelectedItem.type === "rectangle" ||
        modSelectedItem.type === "text"
      ) {
        this.handleChangeItem({
          ...modSelectedItem,
          color
        });
      }
    }

    this.setState({ color });
  };

  private handleChangeOutlineColor = (color: string) => {
    const { selectedItem, items } = this.state;

    if (selectedItem && typeof selectedItem.itemId === "number") {
      const modSelectedItem = { ...items[selectedItem.itemId as number] };

      if (modSelectedItem.type !== "text") {
        this.handleChangeItem({
          ...modSelectedItem,
          outlineColor: color
        });
      }
    }

    this.setState({ outlineColor: color });
  };

  private handleChangeFont = (font: string) => {
    const { selectedItem, items, target } = this.state;

    if (selectedItem && typeof selectedItem.itemId === "number") {
      const modSelectedItem = { ...items[selectedItem.itemId as number] };

      if (modSelectedItem.type === "text") {
        this.handleChangeItem({
          ...modSelectedItem,
          fontName: font
        });
      }
    }

    this.setState({ font, target: undefined }, () => this.setState({ target }));
  };

  private handleChangeFontSize = (size: number) => {
    const { selectedItem, items, target } = this.state;

    if (selectedItem && typeof selectedItem.itemId === "number") {
      const modSelectedItem = { ...items[selectedItem.itemId as number] };

      if (modSelectedItem.type === "text") {
        this.handleChangeItem({
          ...modSelectedItem,
          fontSize: size
        });
      }
    }

    this.setState(
      {
        fontSize: size,
        target: undefined
      },
      () => this.setState({ target })
    );
  };

  private handleChangeOutlineWeight = (outline: number) => {
    const { selectedItem, items, target } = this.state;

    if (selectedItem && typeof selectedItem.itemId === "number") {
      const modSelectedItem = { ...items[selectedItem.itemId as number] };

      if (modSelectedItem.type !== "text") {
        this.handleChangeItem({
          ...modSelectedItem,
          outlineWeight: outline
        });
      }
    }

    this.setState(
      {
        outlineWeight: outline,
        target: undefined
      },
      () => this.setState({ target })
    );
  };

  private handleChangeFontStyle = (style: "bold" | "italic" | "underline") => {
    return (status: boolean) => {
      const { selectedItem, items, target } = this.state;

      if (selectedItem && typeof selectedItem.itemId === "number") {
        const modSelectedItem = { ...items[selectedItem.itemId as number] };

        if (modSelectedItem.type === "text") {
          this.handleChangeItem({
            ...modSelectedItem,
            [style]: status
          });
        }
      }

      switch (style) {
        case "bold":
          this.setState(
            {
              bold: status,
              target: undefined
            },
            () => this.setState({ target })
          );
          break;
        case "italic":
          this.setState(
            {
              italic: status,
              target: undefined
            },
            () => this.setState({ target })
          );
          break;
        case "underline":
          this.setState(
            {
              target: undefined,
              underline: status
            },
            () => this.setState({ target })
          );
          break;
      }
    };
  };

  private handleChangeTarget = (el?: HTMLElement, func?: () => void) => {
    this.setState({ target: el }, func);
  };
}

export default Designer;
