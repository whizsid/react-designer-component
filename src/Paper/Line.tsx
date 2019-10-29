import * as React from "react";
import { IDesignerItemComponent, LineItem } from "../types";

class Line extends React.Component<LineItem & IDesignerItemComponent> {
  public render() {
    const {
      classes,
      outlineWeight,
      position,
      rotate,
      onSelect,
      size,
      onRemove,
      outlineColor
    } = this.props;
    return (
      <div
        onClick={onSelect}
        className={classes.wrapper}
        style={{
          height: outlineWeight + 8,
          left: position.left,
          paddingBottom: 4,
          paddingTop: 4,
          position: "absolute",
          top: position.top,
          transform: "rotate(" + rotate + "deg)",
          transformOrigin:"left top",
          width: size.width
        }}
      >
        <div
          style={{
            background: outlineColor,
            height: outlineWeight,
            width: size.width,
          }}
        />
        <p onClick={onRemove} className={classes.closeButton}>
          X
        </p>
      </div>
    );
  }
}

export default Line;
