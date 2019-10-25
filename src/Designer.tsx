import { merge } from "lodash";
import * as React from "react";
import Paper from "./Paper/Paper";
import styleClasses from "./styleClasses";
import "./styles.css";
import ToolBox from "./ToolBox/ToolBox";
import {
  DesignerItem,
  IDesignerProps,
  IImageInfo,
  IPosition,
  ISize,
  IStyleClasses
} from "./types";

interface IDesignerState {
  classes: IStyleClasses;
  items: { [x: string]: DesignerItem };
  lastItemId: number;
  useInternalItems: boolean;
  color: string;
  area: IPosition[];
}

class Designer extends React.Component<IDesignerProps, IDesignerState> {
  public static defaultProps = {
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

    this.handleAddImage = this.handleAddImage.bind(this);
    this.handleAddCircle = this.handleAddCircle.bind(this);
    this.handleAddRectangle = this.handleAddRectangle.bind(this);
    this.handleAddLine = this.handleAddLine.bind(this);
    this.handleAddText = this.handleAddText.bind(this);
  }

  public componentDidUpdate(prevProps: IDesignerProps) {
    const { useInternalItems } = this.state;
    const { items } = this.props;

    if (!useInternalItems && !prevProps.items && items) {
      this.setState({ useInternalItems: false });
    }
  }

  public render() {
    const { classes, items, area } = this.state;

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
        />
        <div className={classes.designer.toolOptions.wrapper}>Toolbar</div>
        <Paper
          classes={classes.designer.paper}
          height={paperSize!.height}
          width={paperSize!.width}
          items={items}
          area={area}
        />
      </div>
    );
  }

  private addItem(item: DesignerItem) {
    const { useInternalItems, lastItemId } = this.state;
    const { onChangeItems } = this.props;

    const items = useInternalItems ? this.state.items : this.props.items;

    const newItems = { ...items, [lastItemId + 1]: item };

    this.setState({ items: newItems, lastItemId: lastItemId + 1 });

    if (onChangeItems) {
      onChangeItems(newItems);
    }
  }

  private generatePosition(size: ISize): IPosition {
    const { paperSize } = this.props;

    return {
      left: (paperSize!.width - size.width) / 2,
      top: (paperSize!.height - size.height) / 2
    };
  }

  private handleAddImage(info: IImageInfo) {
    const size: ISize = { width: 0, height: 0 };
    const { itemInitSize } = this.props;
    const { color } = this.state;

    const expectedRatio = itemInitSize!.height / itemInitSize!.width;
    const currentRatio = info.size.height / info.size.width;

    if (currentRatio > expectedRatio) {
      size.height = itemInitSize!.height;
      size.width = Math.round(
        (itemInitSize!.height / info.size.height) * info.size.width
      );
    } else if (currentRatio < expectedRatio) {
      size.width = itemInitSize!.width;
      size.height = Math.round(
        (itemInitSize!.width / info.size.width) * info.size.height
      );
    } else {
      size.width = 100;
      size.height = 100;
    }

    const position = this.generatePosition(size);

    this.addItem({
      data: info.data,
      naturalSize: info.size,
      outlineColor: color,
      outlineWeight: 0,
      position,
      rotate: 0,
      size,
      type: "image"
    });
  }

  private handleAddCircle() {
    const { itemInitSize } = this.props;
    const { color } = this.state;

    this.addItem({
      color: "transparent",
      naturalSize: itemInitSize!,
      outlineColor: color,
      outlineWeight: 1,
      position: this.generatePosition(itemInitSize!),
      rotate: 0,
      size: itemInitSize!,
      type: "circle"
    });
  }

  private handleAddRectangle() {
    const { itemInitSize } = this.props;
    const { color } = this.state;

    this.addItem({
      color: "transparent",
      naturalSize: itemInitSize!,
      outlineColor: color,
      outlineWeight: 1,
      position: this.generatePosition(itemInitSize!),
      rotate: 0,
      size: itemInitSize!,
      type: "rectangle"
    });
  }

  private handleAddLine() {
    const { color } = this.state;
    const { itemInitSize } = this.props;

    this.addItem({
      outlineColor: color,
      outlineWeight: 1,
      position: this.generatePosition({ ...itemInitSize!, height: 2 }),
      rotate: 0,
      type: "line"
    });
  }

  private handleAddText() {
    const { color } = this.state;

    this.addItem({
      bold: false,
      color,
      fontId: 2,
      fontName: "Sans Serif",
      fontSize: 10,
      italic: false,
      position: this.generatePosition({ width: 200, height: 10 }),
      rotate: 0,
      text: "Click to change text",
      type: "text",
      underline: false
    });
  }
}

export default Designer;
