import { IStyleClasses } from "./types";

const styleClasses: IStyleClasses = {
  designer: {
    paper: {
        drawingArea: "rdc-paper-drawing-area",
        wrapper: "rdc-paper",
    },
    toolOptions: {
      wrapper: "rdc-tooloptions"
    },
    toolbox: {
      button: {
        icon: "rdc-toolbox-button-icon",
        tooltip: "rdc-toolbox-button-tooltip",
        wrapper: "rdc-toolbox-button"
      },
      switch: {
        icon: "rdc-toolbox-switch-icon",
        tooltip: "rdc-toolbox-switch-tooltip",
        wrapper: {
          active: "rdc-toolbox-switch-active",
          default: "rdc-toolbox-switch-default"
        }
      },
      wrapper: "rdc-toolbox"
    },
    wrapper: "rdc-wrapper"
  }
};


export default styleClasses;