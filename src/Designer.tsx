import { merge } from "lodash";
import * as React from "react";
import { IDesignerProps } from "./types";

interface IDesignerState {
  classes: {
    designer: {
      wrapper: string;
    };
  };
}

const defaultClasses = {
  designer: {
    wrapper: "rdc-wrapper",
  },
};

class Designer extends React.Component<IDesignerProps, IDesignerState> {
  public componentDidMount() {
    const { classes } = this.props;

    this.setState({ classes: merge(classes, defaultClasses) });
  }

  public render() {
    const { classes } = this.props;

    return (
      <div
        className={
          classes && classes.designer ? classes.designer.wrapper : undefined
        }
      >
        ljnj
      </div>
    );
  }
}

export default Designer;
