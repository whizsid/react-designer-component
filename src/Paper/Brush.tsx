import classnames from "classnames";
import * as React from "react";
import { BrushItem, IDesignerItemComponent } from "../types";
import CloseButton from "./CloseButton";

class Brush extends React.Component<BrushItem & IDesignerItemComponent> {
  public render() {
    const {
      selected,
      onRemove,
      onSelect,
      classes,
      outlineColor,
      outlineWeight,
      positions,
      position,
      naturalPosition,
      rotate
    } = this.props;

    const maxLeft = positions.reduce((prvPos, curPos) =>
      prvPos.left < curPos.left ? curPos : prvPos
    );
    const maxTop = positions.reduce((prvPos, curPos) =>
      prvPos.top < curPos.top ? curPos : prvPos
    );

    const minLeft = positions.reduce((prvPos, curPos) =>
      prvPos.left > curPos.left ? curPos : prvPos
    );
    const minTop = positions.reduce((prvPos, curPos) =>
      prvPos.top > curPos.top ? curPos : prvPos
    );

    const widthCalc = Math.abs(minLeft.left - maxLeft.left);
    const heightCalc = Math.abs(minTop.top - maxTop.top);

    return (
      <div
        onClick={onSelect}
        style={{
          height: heightCalc,
          left: position.left,
          position: "absolute",
          top: position.top,
          transform: `rotate( ${rotate}deg)`,
          width: widthCalc
        }}
        className={classnames(classes.wrapper, classes.brush)}
      >
        <CloseButton
          show={selected}
          onClick={onRemove}
          className={classes.closeButton}
        />
        <div
          style={{
            height: heightCalc,
            position: "relative",
            width: widthCalc
          }}
        >
          {positions.map((pos, key) => (
            <span
              key={key}
              style={{
                background: outlineColor,
                display: "block",
                height: outlineWeight,
                left: pos.left - naturalPosition.left,
                position: "absolute",
                top: pos.top - naturalPosition.top,
                width: outlineWeight
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Brush;
