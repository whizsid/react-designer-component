import * as React from "react";
import AddBoxSvg from "../Icon/AddBox.svg";
import AddCircleSvg from "../Icon/AddCircle.svg";
import AddPhotoAlternateSvg from "../Icon/AddPhotoAlternate.svg";
import BrushSvg from "../Icon/Brush.svg";
import LineWeightSvg from "../Icon/LineWeight.svg";
import TextFormatSvg from "../Icon/TextFormat.svg";
import { IImageInfo, IToolBoxProps } from "../types";
import Button from "./Button";

interface IState {
  imageInput: HTMLInputElement | null;
}

export default class ToolBox extends React.Component<IToolBoxProps, IState> {
  constructor(props: IToolBoxProps) {
    super(props);

    this.state = {
      imageInput: null
    };
  }

  public render() {
    const {
      classes,
      onAddCircle,
      onAddRectangle,
      onAddLine,
      onAddText,
      onAddBrush,
      mode,
      features
    } = this.props;
    return (
      <div className={classes.wrapper}>
        {features.image ? (
          <Button
            onClick={this.handleClickImageInput}
            icon={<AddPhotoAlternateSvg />}
            active={mode && mode === "image"}
            classes={classes.button}
            tooltip={"Click to add an image"}
          />
        ) : null}
        {features.circle ? (
          <Button
            onClick={onAddCircle}
            icon={<AddCircleSvg />}
            classes={classes.button}
            active={mode && mode === "circle"}
            tooltip={"Click to add a circle"}
          />
        ) : null}
        {features.rectangle ? (
          <Button
            onClick={onAddRectangle}
            icon={<AddBoxSvg />}
            classes={classes.button}
            active={mode && mode === "rectangle"}
            tooltip={"Click to add a rectangle"}
          />
        ) : null}
        {features.line ? (
          <Button
            onClick={onAddLine}
            icon={<LineWeightSvg />}
            classes={classes.button}
            active={mode && mode === "line"}
            tooltip={"Click to add a straight line"}
          />
        ) : null}
        {features.text ? (
          <Button
            onClick={onAddText}
            icon={<TextFormatSvg />}
            classes={classes.button}
            active={mode && mode === "text"}
            tooltip={"Click to add text"}
          />
        ) : null}
        {features.brush ? (
          <Button
            onClick={onAddBrush}
            icon={<BrushSvg />}
            classes={classes.button}
            active={mode && mode === "brush"}
            tooltip={"Click to toggle to brush mode"}
          />
        ) : null}
        <input
          onChange={this.handleChangeImage}
          style={{ display: "none" }}
          type="file"
          ref={this.setImageInputRef}
        />
      </div>
    );
  }

  private handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const { onAddImage } = this.props;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      e.target.value = "";

      reader.onload = () => {
        const result = reader.result;
        const img = new Image();

        img.src = result as string;

        img.onload = () => {
          const imageInfo: IImageInfo = {
            data: result as string,
            size: {
              height: img.naturalHeight,
              width: img.naturalWidth
            }
          };

          if (onAddImage) {
            onAddImage(imageInfo);
          }
        };
      };
    }
  };

  private handleClickImageInput = () => {
    const { imageInput } = this.state;

    if (imageInput) {
      imageInput.click();
    }
  };

  private setImageInputRef = (el: HTMLInputElement | null) => {
    if (el) {
      this.setState({ imageInput: el });
    }
  };
}
