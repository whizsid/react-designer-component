import { Font } from "@samuelmeuli/font-manager";
import classnames from "classnames";
import FontPicker from "font-picker-react";
import * as React from "react";
import BoldIcon from "../Icon/Bold.svg";
import ItalicIcon from "../Icon/Italic.svg";
import UnderLineIcon from "../Icon/Underline.svg";
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
      fontApiKey,
      bold,
      italic,
      underline,
      fontSize,
      outlineWeight,
      mode
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
        {mode && mode === "text"
          ? [
              <div key={0} className={classes.fontPicker}>
                <FontPicker
                  apiKey={fontApiKey}
                  activeFontFamily={font}
                  onChange={this.handleChangeFont}
                />
              </div>,
              <div key={1} className={classes.fontSize.wrapper}>
                <span className={classes.fontSize.label}>Size :</span>
                <input
                  min="0"
                  type="number"
                  value={fontSize}
                  className={classes.fontSize.input}
                  onChange={this.handleChangeFontSize}
                />
              </div>,
              <span
                key={2}
                className={classnames(
                  classes.italicIcon.default,
                  italic ? classes.italicIcon.active : undefined
                )}
                onClick={this.handleClickItalicIcon}
              >
                <ItalicIcon />
              </span>,
              <span
                key={3}
                className={classnames(
                  classes.boldIcon.default,
                  bold ? classes.boldIcon.active : undefined
                )}
                onClick={this.handleClickBoldIcon}
              >
                <BoldIcon />
              </span>,
              <span
                key={4}
                className={classnames(
                  classes.underlineIcon.default,
                  underline ? classes.underlineIcon.active : undefined
                )}
                onClick={this.handleClickUnderlineIcon}
              >
                <UnderLineIcon />
              </span>
            ]
          : null}
        {mode && mode !== "text" ? (
          <div className={classes.outlineWeight.wrapper}>
            <span className={classes.outlineWeight.label}>Outline Width :</span>
            <input
              min="0"
              type="number"
              value={outlineWeight}
              className={classes.outlineWeight.input}
              onChange={this.handleChangeOutlineWeight}
            />
          </div>
        ) : null}
      </div>
    );
  }

  protected handleChangeFont = (font: Font) => {
    const { onChangeFont } = this.props;

    if (onChangeFont) {
      onChangeFont(font.family);
    }
  };

  protected handleChangeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeFontSize } = this.props;

    if (onChangeFontSize) {
      const value = parseInt(e.target.value);

      onChangeFontSize(value);
    }
  };

  protected handleChangeOutlineWeight = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { onChangeOutlineWeight } = this.props;

    if (onChangeOutlineWeight) {
      const value = parseInt(e.target.value);

      onChangeOutlineWeight(value);
    }
  };

  protected handleClickItalicIcon = () => {
    const { italic, onToggleItalic } = this.props;

    if (onToggleItalic) {
      onToggleItalic(!italic);
    }
  };

  protected handleClickBoldIcon = () => {
    const { bold, onToggleBold } = this.props;

    if (onToggleBold) {
      onToggleBold(!bold);
    }
  };

  protected handleClickUnderlineIcon = () => {
    const { underline, onToggleUnderline } = this.props;

    if (onToggleUnderline) {
      onToggleUnderline(!underline);
    }
  };
}

export default ToolOptions;
