import * as React from "react";
import { IDesignerItemComponent, ResizableItem } from "../types";

// Basic item component
class Basic extends React.Component<
  ResizableItem & IDesignerItemComponent & { styles?: React.CSSProperties }
> {
  public render() {
    const {
      size,
      position,
      rotate,
      selected,
      onRemove,
      onSelect,
      classes,
      styles,
      outlineColor,
      outlineWeight
    } = this.props;

    return (
      <div
        onClick={onSelect}
        className={classes.wrapper}
        style={{
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          border: "solid " + outlineWeight + "px " + outlineColor,
          height: size.height,
          left: position.left,
          position:"absolute",
          top: position.top,
          transform: "rotate(" + rotate + "deg)",
          width: size.width,
          ...styles
        }}
      >
        {selected ? (
          <p className={classes.closeButton} onClick={onRemove} >X</p>
        ) : null}
      </div>
    );
  }
}

export default Basic;
