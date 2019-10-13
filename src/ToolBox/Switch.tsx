import * as React from "react";
import {IToolBoxSwitchProps} from "../types";

class Switch extends React.Component<IToolBoxSwitchProps> {
    constructor(props:IToolBoxSwitchProps){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    public render(){
        const {classes,active,icon,tooltip} = this.props;

        return (
            <div className={active?classes.wrapper.active:classes.wrapper.default} >
                <div className={classes.tooltip}>
                    {tooltip}
                </div>
                {icon}
            </div>
        );
    }

    protected handleClick(){
        const {onToggle,active} = this.props;

        onToggle(!active);
    }
}

export default Switch;