import * as React from "react";
import { ChromePicker, ColorResult } from "react-color";
import { IToolOptionsColorPickerProps } from "../types";

interface IState {
  fillColorOpen: boolean;
  outlineColorOpen: boolean;
}

class ColorPicker extends React.Component<
  IToolOptionsColorPickerProps,
  IState
> {
  constructor(props: IToolOptionsColorPickerProps) {
    super(props);

    this.state = {
      fillColorOpen: false,
      outlineColorOpen: false
    };
  }

  public render() {
    const { classes, fillColor, outlineColor } = this.props;
    const { fillColorOpen, outlineColorOpen } = this.state;

    return (
      <div className={classes.wrapper}>
        <div
          onClick={this.handleFillPickerOpen}
          className={classes.fill}
          style={{
            background: fillColor ? fillColor : undefined
          }}
          title="Change fill color"
        />
        <div
          onClick={this.handleOutlinePickerOpen}
          className={classes.outline}
          style={{
            background: outlineColor ? outlineColor : undefined
          }}
          title="Change outline color"
        />
        {fillColorOpen || outlineColorOpen ? (
          <div className={classes.picker}>
            <ChromePicker
              onChange={this.handleChangeColor}
              color={fillColorOpen ? fillColor : outlineColor}
            />
            <div onClick={this.handleClosePicker} className={classes.okButton}>
              Ok
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  protected handleFillPickerOpen = () => {
    this.setState({ fillColorOpen: true });
  };

  protected handleOutlinePickerOpen = () => {
    this.setState({ outlineColorOpen: true });
  };

  protected handleChangeColor = (color: ColorResult) => {
    const { onChangeFillColor, onChangeOutlineColor } = this.props;
    const { fillColorOpen, outlineColorOpen } = this.state;

    if (fillColorOpen && onChangeFillColor && color.rgb.a) {
      onChangeFillColor(
        `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
      );
    } else if (outlineColorOpen && onChangeOutlineColor && color.rgb.a) {
      onChangeOutlineColor(
        `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
      );
    }
  };

  protected handleClosePicker = () => {
    this.setState({ fillColorOpen: false, outlineColorOpen: false });
  };
}

export default ColorPicker;
