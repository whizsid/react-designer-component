import classnames from "classnames";
import * as React from "react";
import { IDesignerItemComponent, TextItem } from "../types";
import CloseButton from "./CloseButton";

class Text extends React.Component<
  TextItem & IDesignerItemComponent & { onChangeText: (value?: string) => void }
> {
  public render() {
    const {
      classes,
      fontName,
      fontSize,
      color,
      rotate,
      position,
      selected,
      text,
      onRemove,
      bold,
      italic,
      underline
    } = this.props;

    return (
      <div
        className={classnames(classes.wrapper, classes.text)}
        style={{
          color,
          fontFamily: fontName,
          fontSize,
          fontStyle: italic ? "italic" : "unset",
          fontWeight: bold ? 750 : 500,
          left: position.left - 8,
          padding: 8,
          position: "absolute",
          textDecoration: underline ? "underline" : "unset",
          top: position.top - 8,
          transform: "rotate( " + rotate + "deg)"
        }}
        onClick={this.handleClickWrapper}
      >
        <CloseButton
          className={classes.closeButton}
          show={selected}
          onClick={onRemove}
        />
        <span
          style={{ pointerEvents: "inherit" }}
          onChange={this.handleChangeText}
          onFocus={this.handleFocusText}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {text}
        </span>
      </div>
    );
  }

  private handleClickWrapper = (e: React.MouseEvent<HTMLElement>) => {
    const { onSelect } = this.props;

    const target = e.target as HTMLElement;

    if (target.tagName === "SPAN") {
      target.focus();
    } else if (onSelect) {
      onSelect(e);
    }
    e.currentTarget.parentElement!.click();
  };

  private handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeText } = this.props;

    onChangeText(e.target.value);
  };

  private handleFocusText = (e: React.FocusEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;

    const range = document.createRange();
    range.selectNodeContents(target);
    const sel = window.getSelection();

    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
}

export default Text;
