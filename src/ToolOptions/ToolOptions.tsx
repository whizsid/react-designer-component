import { Font } from "@samuelmeuli/font-manager";
import FontPicker from "font-picker-react";
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
      onChangeOutlineColor,
      font,
      fontApiKey      
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
        <div className={classes.fontPicker}>
          <FontPicker
            apiKey={fontApiKey}
            activeFontFamily={font}
            onChange={this.handleChangeFont}
          />
        </div>
      </div>
    );
  }

  protected handleChangeFont = (font: Font) => {
    const { onChangeFont } = this.props;

    if (onChangeFont) {
      onChangeFont(font.family);
    }
  };
}

export default ToolOptions;
