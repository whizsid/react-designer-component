import { IStyleClasses } from "./types";

const styleClasses: IStyleClasses = {
  designer: {
    paper: {
      drawingArea: {
        item: {
          brush: "rdc-paper-drawing-item-brush",
          circle: "rdc-paper-drawing-item-circle",
          closeButton: "rdc-paper-drawing-item-close",
          image: "rdc-paper-drawing-item-image",
          line: "rdc-paper-drawing-item-line",
          rectangle: "rdc-paper-drawing-item-rectangle",
          text: "rdc-paper-drawing-item-text",
          wrapper: "rdc-paper-drawing-item"
        },
        wrapper: "rdc-paper-drawing"
      },
      wrapper: "rdc-paper"
    },
    toolOptions: {
      boldIcon: {
        active: "rdc-tooloptions-bold-active",
        default: "rdc-tooloptions-bold-default"
      },
      colorPicker: {
        fill: "rdc-tooloptions-color-picker-fill",
        okButton: "rdc-tooloptions-color-picker-ok-button",
        outline: "rdc-tooloptions-color-picker-outline",
        picker: "rdc-tooloptions-color-picker-picker",
        wrapper: "rdc-tooloptions-color-picker"
      },
      fontPicker: "rdc-tooloptions-font-picker",
      fontSize: {
        input: "rdc-tooloptions-font-size-input",
        label: "rdc-tooloptions-font-size-label",
        wrapper: "rdc-tooloptions-font-size-wrapper"
      },
      italicIcon: {
        active: "rdc-tooloptions-italic-active",
        default: "rdc-tooloptions-italic-default"
      },
      outlineWeight: {
        input: "rdc-tooloptions-outline-weight-input",
        label: "rdc-tooloptions-outline-weight-label",
        wrapper: "rdc-tooloptions-outline-weight-wrapper"
      },
      underlineIcon: {
        active: "rdc-tooloptions-underline-active",
        default: "rdc-tooloptions-underline-default"
      },
      wrapper: "rdc-tooloptions"
    },
    toolbox: {
      button: {
        icon: "rdc-toolbox-button-icon",
        tooltip: "rdc-toolbox-button-tooltip",
        wrapper: {
          active: "rdc-toolbox-button-active",
          default: "rdc-toolbox-button-default"
        }
      },
      wrapper: "rdc-toolbox"
    },
    wrapper: "rdc-wrapper"
  }
};

export default styleClasses;
