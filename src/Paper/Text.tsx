import * as React from "react";
import { IDesignerItemComponent, TextItem } from "../types";

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
      text,
      onRemove
    } = this.props;

    return (
      <div
        className={classes.wrapper}
        style={{
          color,
          fontFamily: fontName,
          fontSize,
          left: position.left,
          padding: 8,
          position: "absolute",
          top: position.top,
          transform: "rotate( " + rotate + "deg)",
        }}
        onClick={this.handleClickWrapper}
      >
        <span
          style={{ pointerEvents: "inherit" }}
          onChange={this.handleChangeText}
          onFocus={this.handleFocusText}
          contentEditable={true}
        >
          {text}
        </span>
        <p onClick={onRemove} className={classes.closeButton}>
          X
        </p>
      </div>
    );
  }

  private handleClickWrapper = (e: React.MouseEvent<HTMLElement>) => {
    const { onSelect } = this.props;

    const target = e.target as HTMLElement;

    if (target.tagName === "SPAN") {
      target.focus();
      const range = document.createRange();
      range.selectNodeContents(target);
      const sel = window.getSelection();

      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } else if (onSelect) {
      onSelect(e);
    }
    e.currentTarget.parentElement!.click();
  };

  private handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChangeText } = this.props;

    onChangeText(e.target.value);
  };

  private handleFocusText = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
}

export default Text;
