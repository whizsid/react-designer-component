import * as React from "react";
import {IToolBoxButtonProps} from "../types";

class Button extends React.Component<IToolBoxButtonProps> {
    public render(){
        const {icon,classes,tooltip,onClick,active} = this.props;
        return (
            <div onClick={onClick} className={active?classes.wrapper.active:classes.wrapper.default} >
                <div className={classes.tooltip}>
                    {tooltip}
                </div>
                {icon}
            </div>
        );
    }
}

export default Button;