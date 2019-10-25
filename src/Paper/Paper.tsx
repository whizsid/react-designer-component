import * as React from "react";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import { DesignerItem,IPaperProps, ResizableItem, RotatableItem } from "../types";

interface IState {
  target?: HTMLElement | SVGElement;
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
  }

  public render() {
    const { classes, height, width, area } = this.props;

    const { target } = this.state;

    const clipPath =
      "polygon(" +
      area.map(position => position.left + " " + position.top).join(", ") +
      ")";

    return (
      <div className={classes.wrapper} style={{ height, width }}>
        <div
          className={classes.drawingArea}
          style={{ overflow: "hidden", height, width, clipPath }}
          ref={this.canvasRef}
        >
          jnj
        </div>
        <div>
          <Moveable
            container={this.canvasRef.current}
            target={target}
            keepRatio={false}
            origin={true}
            draggable={true}
            snappable={true}
            transformOrigin="% %"
            verticalGuidelines={[100, 200, 400, 500]}
            horizontalGuidelines={[100, 200, 400, 500]}
            snapCenter={true}
            resizable={true}
            throttleDrag={0}
            throttleResize={1}
            throttleRotate={1}
            rotatable={true}
            onDrag={this.handleDrag}
            onResize={this.handleResize}
            onRotate={this.handleRotate}
          />
        </div>
      </div>
    );
  }

  protected handleDrag(e: OnDrag) {
    const { onDrag } = this.props;
    const { selectedItem } = this.state;

    if (onDrag && selectedItem) {
      onDrag({ ...selectedItem, position: { left: e.left, top: e.top } });
    }
  }

  protected handleResize(e: OnResize) {
    const { onResize } = this.props;
    const { selectedItem } = this.state;

    if (onResize && selectedItem) {
      let left = selectedItem.position.left as number;
      let top = selectedItem.position.top as number;

      if (e.direction[0] === -1) {
        left -= e.delta[0];
      }

      if (e.direction[1] === -1) {
        top -= e.delta[1];
      }

      const modedItem = {
        ...selectedItem,
        position: { left, top },
        size: { height: e.height, width: e.width }
      };

      onResize(modedItem as ResizableItem);
    }
  }

  protected handleRotate(e: OnRotate) {
    const { onRotate } = this.props;
    const {selectedItem} = this.state;

    if(onRotate&&selectedItem){
        const modedItem = {...selectedItem,rotate:e.rotate};
        onRotate( modedItem as RotatableItem);
    }
  }
}

export default Paper;
