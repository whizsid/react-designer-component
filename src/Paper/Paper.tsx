import * as React from "react";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import {
  DesignerItem,
  IPaperProps,
  ResizableItem,
  RotatableItem
} from "../types";
import Basic from "./Basic";

interface IState {
  target?: HTMLElement;
  selectedItem?: DesignerItem;
}

class Paper extends React.Component<IPaperProps, IState> {
  private canvasRef = React.createRef<HTMLDivElement>();

  constructor(props: IPaperProps) {
    super(props);

    this.state = {};

    this.handleDrag = this.handleDrag.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  public renderItem(item: DesignerItem) {
    const { classes } = this.props;
    const { selectedItem } = this.state;

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
      default:
        return null;
    }
  }

  public render() {
    const { classes, height, width, area, items } = this.props;

    const { target, selectedItem } = this.state;

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
            onDrag={this.handleDrag}
            onResize={this.handleResize}
            onRotate={this.handleRotate}
          />
        ) : null}
        <div
          className={classes.drawingArea.wrapper}
          style={{
            clipPath,
            height,
            overflow: "hidden",
            position: "relative",
            width
          }}
          ref={this.canvasRef}
        >
          {Object.values(items).map(this.renderItem)}
        </div>
      </div>
    );
  }

  protected handleSelectItem(item: DesignerItem) {
    return (e: React.MouseEvent) => {
      if (e.target) {
        const target = e.currentTarget as HTMLElement;
        this.setState({ selectedItem: item, target });
      }
    };
  }

  protected handleDrag(e: OnDrag) {
    const { onDrag, items } = this.props;
    const { selectedItem } = this.state;

    if (onDrag && selectedItem && typeof selectedItem.itemId !== "undefined") {
      onDrag({
        ...items[selectedItem.itemId],
        position: { left: e.left, top: e.top }
      });
    }
  }

  protected handleResize(e: OnResize) {
    const { onResize, items } = this.props;
    const { selectedItem } = this.state;

    if (
      onResize &&
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

      onResize(modedItem as ResizableItem);
    }
  }

  protected handleRotate(e: OnRotate) {
    const { onRotate, items } = this.props;
    const { selectedItem } = this.state;

    if (
      onRotate &&
      selectedItem &&
      typeof selectedItem.itemId !== "undefined"
    ) {
      const modedItem = { ...items[selectedItem.itemId], rotate: e.rotate };
      onRotate(modedItem as RotatableItem);
    }
  }

  protected handleRemoveItem(item: DesignerItem) {
    return () => {
      const { onRemove } = this.props;

      if (onRemove) {
        onRemove(item);
      }
    };
  }
}

export default Paper;
