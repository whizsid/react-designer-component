import classnames from "classnames";
import * as React from "react";
import { IDesignerItemComponent, LineItem } from "../types";
import CloseButton from "./CloseButton";

class Line extends React.Component<LineItem & IDesignerItemComponent> {
  public render() {
    const {
      classes,
      outlineWeight,
      position,
      selected,
      rotate,
      onSelect,
      onRemove,
      outlineColor,
      width
    } = this.props;

    const widthCalc = width;

    return (
      <div
        onClick={onSelect}
        className={classnames(classes.wrapper, classes.line)}
        style={{
          height: outlineWeight + 8,
          left: position.left,
          paddingBottom: 4,
          paddingTop: 4,
          position: "absolute",
          top: position.top,
          transform: `rotate( ${rotate}deg})`,
          transformOrigin: "left top",
          width: widthCalc
        }}
      >
        <CloseButton
          className={classes.closeButton}
          show={selected}
          onClick={onRemove}
        />
        <div
          style={{
            background: outlineColor,
            height: outlineWeight,
            width: widthCalc
          }}
        />
      </div>
    );
  }
}

export default Line;
