import * as React from "react";
import { IDesignerItemComponent, TextItem } from "../types";

class Text extends React.Component<TextItem & IDesignerItemComponent> {
  public render() {
    const { classes, fontName, fontSize, color, rotate, position,text,onSelect,onRemove } = this.props;

    return (
      <div
        className={classes.wrapper}
        style={{
          color,
          fontFamily: fontName,
          fontSize,
          left: position.left,
          position: "absolute",
          top: position.top,
          transform: "rotate( " + rotate + "deg)"
        }}
        onClick={onSelect}
      >
          {text}
        <p onClick={onRemove} className={classes.closeButton}>X</p>
      </div>
    );
  }
}

export default Text;
