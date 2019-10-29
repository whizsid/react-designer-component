import * as React from "react";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import {
  DesignerItem,
  IPaperProps,
  ResizableItem,
  RotatableItem
} from "../types";
import Basic from "./Basic";
import Line from "./Line";

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

    switch (item.type) {
      case "image":
        return (
          <Basic
            {...item}
            key={item.itemId}
            classes={classes.drawingArea.item}
            selected={!!selectedItem && selectedItem.itemId === item.itemId}
            onSelect={this.handleSelectItem(item)}
            onRemove={this.handleRemoveItem(item)}
            styles={{
              backgroundImage: "url( " + item.data + ")"
            }}
          />
        );
      case "circle":
        return (
          <Basic
            {...item}
            key={item.itemId}
            classes={classes.drawingArea.item}
            selected={!!selectedItem && selectedItem.itemId === item.itemId}
            onSelect={this.handleSelectItem(item)}
            onRemove={this.handleRemoveItem(item)}
            styles={{
              borderRadius: "100%"
            }}
          />
        );
      case "rectangle":
        return (
          <Basic
            {...item}
            key={item.itemId}
            classes={classes.drawingArea.item}
            selected={!!selectedItem && selectedItem.itemId === item.itemId}
            onSelect={this.handleSelectItem(item)}
            onRemove={this.handleRemoveItem(item)}
          />
        );
      case "line":
        return (
          <Line
            {...item}
            key={item.itemId}
            classes={classes.drawingArea.item}
            selected={!!selectedItem && selectedItem.itemId === item.itemId}
            onSelect={this.handleSelectItem(item)}
            onRemove={this.handleRemoveItem(item)}
          />
        );
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
        style={{ height, width, position: "relative" }}
      >
        {typeof selectedItem !== "undefined" ? (
          <Moveable
            container={this.canvasRef.current}
            target={target}
            keepRatio={false}
            origin={true}
            draggable={selectedItem.ables.resize}
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
      if (target.tagName !== "P" && onSelectItem) {
        onSelectItem(item);
        this.setState({ target });
      }
    };
  };

  protected handleDragItem = (e: OnDrag) => {
    const { onDragItem, items } = this.props;
    const { selectedItem } = this.props;

    if (
      onDragItem &&
      selectedItem &&
      typeof selectedItem.itemId !== "undefined"
    ) {
      onDragItem({
        ...items[selectedItem.itemId],
        position: { left: e.left, top: e.top }
      });
    }
  };

  protected handleResizeItem = (e: OnResize) => {
    const { onResizeItem, items } = this.props;
    const { selectedItem } = this.props;

    if (
      onResizeItem &&
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

      const modedItem = {
        ...items[selectedItem.itemId],
        position: { left, top },
        size: { height: e.height, width: e.width }
      };

      onResizeItem(modedItem as ResizableItem);
    }
  };

  protected handleRotateItem = (e: OnRotate) => {
    const { onRotateItem, items, selectedItem } = this.props;

    if (
      onRotateItem &&
      selectedItem &&
      typeof selectedItem.itemId !== "undefined"
    ) {
      const modedItem = { ...items[selectedItem.itemId], rotate: e.rotate };
      onRotateItem(modedItem as RotatableItem);
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
}

export default Paper;
