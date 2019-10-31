import * as React from "react";
import { BrushItem, IDesignerItemComponent } from "../types";

class Brush extends React.Component<BrushItem & IDesignerItemComponent> {
  public render() {
    const {
      // selected,
      // onRemove,
      onSelect,
      // classes,
      outlineColor,
      outlineWeight,
      positions,
      position
    } = this.props;

    const maxLeft = positions.reduce((prvPos, curPos) =>
      prvPos.left < curPos.left ? curPos : prvPos
    );
    const maxTop = positions.reduce((prvPos, curPos) =>
      prvPos.top < curPos.top ? curPos : prvPos
    );

    const width = Math.abs(position.left - maxLeft.left);
    const height = Math.abs(position.top - maxTop.top);
    
    return (
      <div
        onClick={onSelect}
        style={{
          height,
          left: position.left,
          position: "absolute",
          top: position.top,
          width
        }}
      >
        <div
          style={{
            height,
            position: "relative",
            width
          }}
        >
            {positions.map((pos,key)=>(
                <span
                    key={key}
                    style={{
                        background: outlineColor,
                        display: "block",
                        height: outlineWeight,
                        left: pos.left - position.left,
                        position: "absolute",
                        top: pos.top-position.top,
                        width: outlineWeight,
                    }}
                />
            ))}
        </div>
      </div>
    );
  }
}

export default Brush;
