import * as React from "react";
import {IToolBoxButtonProps} from "../types";

class Button extends React.Component<IToolBoxButtonProps> {
    public render(){
        const {icon,classes,tooltip,onClick} = this.props;
        return (
            <div onClick={onClick} className={classes.wrapper} >
                <div className={classes.tooltip}>
                    {tooltip}
                </div>
                {icon}
            </div>
        );
    }
}

export default Button;