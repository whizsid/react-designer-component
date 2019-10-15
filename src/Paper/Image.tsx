import * as React from "react";
import { IDesignerItemComponent, ImageItem } from "../types";

class Image extends React.Component<ImageItem & IDesignerItemComponent> {
  public render() {
    const { data, size, position, rotate, selected, onRemove, onSelect } = this.props;

    return (
      <div
        onClick={onSelect}
        style={{
          backgroundImage: "url(" + data + ")",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          height: size.height,
          left: position.left,
          top: position.top,
          transform: "rotate(" + rotate + "deg)",
          width: size.width
        }}
      >
        {selected ? <div onClick={onRemove} /> : null}
      </div>
    );
  }
}

export default Image;
