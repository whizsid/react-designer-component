import { merge } from "lodash";
import * as React from "react";
import { IDesignerClasses, IDesignerProps } from "./types";

interface IRealClasses {
  designer: IDesignerClasses;
}

interface IDesignerState {
  classes: IRealClasses;
}

const defaultClasses: IRealClasses = {
  designer: {
    paper: {
      wrapper: "rdc-paper"
    },
    toolOptions: {
      wrapper: "rdc-tooloptions"
    },
    toolbox: {
      wrapper: "rdc-toolbox"
    },
    wrapper: "rdc-wrapper"
  }
};

class Designer extends React.Component<IDesignerProps, IDesignerState> {
  public static defaultProps = {
    paperHeight: 600,
    paperWidth: 300
  };

  constructor(props: IDesignerProps) {
    super(props);

    const { classes } = this.props;

    this.state = {
      classes: merge(classes, defaultClasses)
    };
  }

  public render() {
    const { classes } = this.state;

    const { paperHeight, paperWidth } = this.props;

    return (
      <div className={classes.designer.wrapper}>
        <div className={classes.designer.toolbox.wrapper}>kkmk</div>
        <div className={classes.designer.toolOptions.wrapper}>Toolbar</div>
        <div
          className={classes.designer.paper.wrapper}
          style={{ width: paperWidth, height: paperHeight }}
        >
          Paper
        </div>
      </div>
    );
  }
}

export default Designer;
