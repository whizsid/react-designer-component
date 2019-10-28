import { IStyleClasses } from "./types";

const styleClasses: IStyleClasses = {
  designer: {
    paper: {
        drawingArea:{
          item:{
            closeButton:"rdc-paper-drawing-item-close"  ,
            wrapper: "rdc-paper-drawing-item"
          },
          wrapper:"rdc-paper-drawing",
        },
        wrapper: "rdc-paper",
    },
    toolOptions: {
      wrapper: "rdc-tooloptions"
    },
    toolbox: {
      button: {
        icon: "rdc-toolbox-button-icon",
        tooltip: "rdc-toolbox-button-tooltip",
        wrapper: {
          active:"rdc-toolbox-button-active",
          default: "rdc-toolbox-button-default"
        }
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