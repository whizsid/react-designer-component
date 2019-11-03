import classnames from "classnames";
import * as React from "react";
import { IDesignerItemComponent, ResizableItem } from "../types";
import CloseButton from "./CloseButton";

// Basic item component
class Basic extends React.Component<
  ResizableItem &
    IDesignerItemComponent & { styles?: React.CSSProperties; color?: string }
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
      outlineWeight,
      type,
      color
    } = this.props;

    return (
      <div
        onClick={onSelect}
        className={classnames(classes.wrapper, classes[type])}
        style={{
          backgroundColor: color,
          border: "solid " + outlineWeight + "px " + outlineColor,
          height: size.height,
          left: position.left,
          position: "absolute",
          top: position.top,
          transform: "rotate(" + rotate + "deg)",
          width: size.width,
          ...styles
        }}
      >
        <CloseButton
          onClick={onRemove}
          className={classes.closeButton}
          show={selected}
        />
      </div>
    );
  }
}

export default Basic;
