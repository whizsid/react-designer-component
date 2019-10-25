import * as React from "react";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";
import { IPaperProps, DesignerItem } from "../types";

interface IState {
  target?: HTMLElement | SVGElement;
  selectedItem?: DesignerItem;
}

class Paper extends React.Component<IPaperProps, IState> {
  private canvasRef = React.createRef<HTMLDivElement>();

  constructor(props: IPaperProps) {
    super(props);

    this.state = {};
  }

  public render() {
    const { classes, height, width, area } = this.props;

    const {target} = this.state;

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
                target={
                    target
                }
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
                // onDrag={this.handleDrag(item.itemId)}
                // onResize={this.handleResize(item)}
                // onRotate={this.handleRotate(item.itemId)}
            />
        </div>
      </div>
    );
  }
}

export default Paper;
