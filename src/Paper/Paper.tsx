import * as React from "react";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import { DesignerItem, IPaperProps, TextItem } from "../types";
import Basic from "./Basic";
import Brush from "./Brush";
import Line from "./Line";
import Text from "./Text";

interface IState {
  mouseDown: boolean;
}

interface IMouseTouchEvent {
  target: HTMLElement;
  currentTarget: HTMLElement;
  x: number;
  y: number;
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
              backgroundImage: "url( " + item.data + ")",
              backgroundPosition: "center",
              backgroundSize: "100% 100%"
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
    const { classes, height, width, area, items, cursor, target } = this.props;

    const { selectedItem } = this.props;

    const clipPath =
      "polygon(" +
      area.map(position => position.left + " " + position.top).join(", ") +
      ")";

    return (
      <div
        className={classes.wrapper}
        style={{ height, width, position: "relative" }}
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
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          {Object.values(items).map(this.renderItem)}
        </span>
      </div>
    );
  }

  protected handleSelectItem = (item: DesignerItem) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      const { onSelectItem, onChangeTarget } = this.props;

      const target = e.target as HTMLElement;

      if (target.tagName === "DIV" && onSelectItem) {
        onSelectItem(item);

        if (onChangeTarget) {
          onChangeTarget(e.currentTarget);
        }
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

      if (
        selectedItem.type !== "line" &&
        typeof selectedItem.itemId !== "undefined"
      ) {
        const modedItem = {
          ...items[selectedItem.itemId],
          position: { left, top },
          size: { height: e.height, width: e.width }
        };
        onChangeItem(modedItem);
      } else if (
        selectedItem.type === "line" &&
        typeof selectedItem.itemId !== "undefined"
      ) {
        const modedItem = {
          ...items[selectedItem.itemId],
          position: { left, top },
          width: e.width
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
      const { onRemoveItem, onChangeTarget } = this.props;

      if (onRemoveItem && onChangeTarget) {
        onChangeTarget(undefined, () => {
          onRemoveItem(item);
        });
      }
    };
  };

  protected handleStartDraw = (e: IMouseTouchEvent) => {
    const {
      onMouseDown,
      selectedItem,
      onSelectItem,
      onChangeTarget
    } = this.props;
    this.setState({ mouseDown: true });
    const boundingBox = e.currentTarget.getBoundingClientRect();
    const target = e.target as HTMLElement;

    if (
      target.tagName === "SPAN" &&
      selectedItem &&
      onSelectItem &&
      onChangeTarget
    ) {
      onChangeTarget(undefined, () => {
        onSelectItem(undefined);
      });
    }

    if (onMouseDown) {
      onMouseDown({
        left: e.x - boundingBox.left,
        top: e.y - boundingBox.top
      });
    }
  };

  protected handleDraw = (e: IMouseTouchEvent) => {
    const { mouseDown } = this.state;
    const { onMouseMove } = this.props;

    const boundingBox = e.currentTarget.getBoundingClientRect();

    if (mouseDown && onMouseMove) {
      onMouseMove({
        left: e.x - boundingBox.left,
        top: e.y - boundingBox.top
      });
    }
  };

  protected handleEndDraw = (e: IMouseTouchEvent) => {
    const { onMouseUp } = this.props;

    const boundingBox = e.currentTarget.getBoundingClientRect();

    this.setState({ mouseDown: false });
    if (onMouseUp) {
      onMouseUp({
        left: e.x - boundingBox.left,
        top: e.y - boundingBox.top
      });
    }
  };

  protected handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    this.handleStartDraw({
      currentTarget: e.currentTarget,
      target,
      x: e.clientX,
      y: e.clientY
    });
  };

  protected handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    this.handleDraw({
      currentTarget: e.currentTarget,
      target,
      x: e.clientX,
      y: e.clientY
    });
  };

  protected handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    this.handleEndDraw({
      currentTarget: e.currentTarget,
      target,
      x: e.clientX,
      y: e.clientY
    });
  };

  protected handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const { mouseDown } = this.state;

    const target = e.target as HTMLElement;

    if (mouseDown) {
      this.handleEndDraw({
        currentTarget: e.currentTarget,
        target,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  protected handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const touch = e.touches[0];

    if (touch) {
      this.handleStartDraw({
        currentTarget: e.currentTarget,
        target,
        x: touch.clientX,
        y: touch.clientY
      });
    }
  };

  protected handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const touch = e.touches[0];

    if (touch) {
      this.handleDraw({
        currentTarget: e.currentTarget,
        target,
        x: touch.clientX,
        y: touch.clientY
      });
    }
  };

  protected handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const touch = e.touches[0];

    if (touch) {
      this.handleEndDraw({
        currentTarget: e.currentTarget,
        target,
        x: touch.clientX,
        y: touch.clientY
      });
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
