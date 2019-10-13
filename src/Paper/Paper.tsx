import * as React from "react";
import {IPaperProps} from "../types";

class Paper extends React.Component<IPaperProps> {
    public render(){
        const {classes,height,width} = this.props;

        return (
            <div className={classes.wrapper} style={{height,width}} >
                kmk
            </div>
        );
    }
}

export default Paper;