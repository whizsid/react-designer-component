import * as React from "react";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import { DesignerItem, IPaperProps, TextItem } from "../types";
import Basic from "./Basic";
import Brush from "./Brush";
import Line from "./Line";
import Text from "./Text";

interface IState {
  target?: HTMLElement;
  mouseDown: boolean;
}

class Paper extends React.Component<IPaperProps, IState> {
  private canvasRef = React.createRef<HTMLDivElement>();

  constructor(props: IPaperProps) {
    super(props);

    this.state = { mouseDown: false };
  }

  public renderItem = (item: DesignerItem) => {
    const { classes } = this.props;
    const { selectedItem } = this.props;

    const commonProps = {
      classes: classes.drawingArea.item,
      key: item.itemId,
      onRemove: this.handleRemoveItem(item),
      onSelect: this.handleSelectItem(item),
      selected: !!selectedItem && selectedItem.itemId === item.itemId
    };

    switch (item.type) {
      case "image":
        return (
          <Basic
            {...item}
            {...commonProps}
            styles={{
              backgroundImage: "url( " + item.data + ")"
            }}
          />
        );
      case "circle":
        return (
          <Basic
            {...item}
            {...commonProps}
            styles={{
              borderRadius: "100%"
            }}
          />
        );
      case "rectangle":
        return <Basic {...item} {...commonProps} />;
      case "line":
        return <Line {...item} {...commonProps} />;
      case "text":
        return (
          <Text
            {...item}
            {...commonProps}
            onChangeText={this.handleChangeText(item)}
          />
        );
      case "brush":
        return <Brush {...item} {...commonProps} />;
      default:
        return null;
    }
  };

  public render() {
    const { classes, height, width, area, items, cursor } = this.props;

    const { target } = this.state;
    const { selectedItem } = this.props;

    const clipPath =
      "polygon(" +
      area.map(position => position.left + " " + position.top).join(", ") +
      ")";

    return (
      <div
        className={classes.wrapper}
        style={{ height,width, position: "relative" }}
      >
        {typeof selectedItem !== "undefined" ? (
          <Moveable
            container={this.canvasRef.current}
            target={target}
            keepRatio={false}
            origin={true}
            draggable={selectedItem.ables.move}
            snappable={true}
            transformOrigin="% %"
            verticalGuidelines={[100, 200, 400, 500]}
            horizontalGuidelines={[100, 200, 400, 500]}
            snapCenter={true}
            resizable={selectedItem.ables.resize}
            throttleDrag={0}
            throttleResize={1}
            throttleRotate={1}
            rotatable={selectedItem.ables.rotate}
            onDrag={this.handleDragItem}
            onResize={this.handleResizeItem}
            onRotate={this.handleRotateItem}
          />
        ) : null}
        <span
          className={classes.drawingArea.wrapper}
          style={{
            clipPath,
            cursor,
            display: "block",
            height,
            overflow: "hidden",
            position: "relative",
            width
          }}
          ref={this.canvasRef}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        >
          {Object.values(items).map(this.renderItem)}
        </span>
      </div>
    );
  }

  protected handleSelectItem = (item: DesignerItem) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      const { onSelectItem } = this.props;

      const target = e.target as HTMLElement;
      
      if (target.tagName === "DIV" && onSelectItem) {
        onSelectItem(item);
        this.setState({ target });
      }
    };
  };

  protected handleDragItem = (e: OnDrag) => {
    const { onChangeItem, items } = this.props;
    const { selectedItem } = this.props;

    if (
      onChangeItem &&
      selectedItem &&
      typeof selectedItem.itemId !== "undefined"
    ) {
      onChangeItem({
        ...items[selectedItem.itemId],
        position: { left: e.left, top: e.top }
      });
    }
  };

  protected handleResizeItem = (e: OnResize) => {
    const { onChangeItem, items } = this.props;
    const { selectedItem } = this.props;

    if (
      onChangeItem &&
      selectedItem &&
      typeof selectedItem.itemId !== "undefined"
    ) {
      let left = items[selectedItem.itemId].position.left as number;
      let top = items[selectedItem.itemId].position.top as number;

      if (e.direction[0] === -1) {
        left -= e.delta[0];
      }

      if (e.direction[1] === -1) {
        top -= e.delta[1];
      }

      if(selectedItem.type!=="line" && typeof selectedItem.itemId !== "undefined"){
        const modedItem = {
          ...items[selectedItem.itemId],
          position: { left, top },
          size: { height: e.height, width: e.width }
        };
        onChangeItem(modedItem);
      } else  if(selectedItem.type==="line" && typeof selectedItem.itemId !== "undefined") {
        const modedItem = {
          ...items[selectedItem.itemId],
          position: { left, top },
          width:e.width,
        };
        onChangeItem(modedItem);
      }

    }
  };

  protected handleRotateItem = (e: OnRotate) => {
    const { onChangeItem, items, selectedItem } = this.props;

    if (
      onChangeItem &&
      selectedItem &&
      typeof selectedItem.itemId !== "undefined"
    ) {
      const modedItem = { ...items[selectedItem.itemId], rotate: e.rotate };
      onChangeItem(modedItem);
    }
  };

  protected handleRemoveItem = (item: DesignerItem) => {
    return () => {
      const { onRemoveItem } = this.props;

      if (onRemoveItem) {
        this.setState({ target: undefined }, () => {
          onRemoveItem(item);
        });
      }
    };
  };

  protected handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onMouseDown, selectedItem, onSelectItem } = this.props;
    this.setState({ mouseDown: true });

    const boundingBox = e.currentTarget.getBoundingClientRect();
    const target = e.target as HTMLElement;

    if (target.tagName === "SPAN" && selectedItem && onSelectItem) {
      this.setState({ target: undefined }, () => {
        onSelectItem(undefined);
      });
    }

    if (onMouseDown) {
      onMouseDown({
        left: e.clientX - boundingBox.left,
        top: e.clientY - boundingBox.top
      });
    }
  };

  protected handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { mouseDown } = this.state;
    const { onMouseMove } = this.props;

    const boundingBox = e.currentTarget.getBoundingClientRect();

    if (mouseDown && onMouseMove) {
      onMouseMove({
        left: e.clientX - boundingBox.left,
        top: e.clientY - boundingBox.top
      });
    }
  };

  protected handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onMouseUp } = this.props;

    const boundingBox = e.currentTarget.getBoundingClientRect();

    this.setState({ mouseDown: false });
    if (onMouseUp) {
      onMouseUp({
        left: e.clientX - boundingBox.left,
        top: e.clientY - boundingBox.top
      });
    }
  };

  protected handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const { mouseDown } = this.state;
    const { onMouseUp } = this.props;

    const boundingBox = e.currentTarget.getBoundingClientRect();

    if (mouseDown) {
      this.setState({ mouseDown: false });

      if (onMouseUp) {
        onMouseUp({
          left: e.clientX - boundingBox.left,
          top: e.clientY - boundingBox.top
        });
      }
    }
  };

  protected handleChangeText = (item: TextItem) => {
    return (value?: string) => {
      const { onChangeItem } = this.props;
      if (value && onChangeItem) {
        onChangeItem({ ...item, text: value });
      }
    };
  };
}

export default Paper;
