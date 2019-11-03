import * as React from "react";
import { IToolOptionsProps } from "../types";
import ColorPicker from "./ColorPicker";

class ToolOptions extends React.Component<IToolOptionsProps> {
  constructor(props: IToolOptionsProps) {
    super(props);

    this.state = {
      fillColorOpen: false,
      outlineColorOpen: false
    };
  }

  public render() {
    const {
      classes,
      fillColor,
      outlineColor,
      onChangeFillColor,
      onChangeOutlineColor
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <ColorPicker
          classes={classes.colorPicker}
          fillColor={fillColor}
          outlineColor={outlineColor}
          onChangeFillColor={onChangeFillColor}
          onChangeOutlineColor={onChangeOutlineColor}
        />
      </div>
    );
  }
}

export default ToolOptions;
