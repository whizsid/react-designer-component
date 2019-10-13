import * as React from "react";
import {IImageInfo,IToolBoxProps} from "../types";
import Button from "./Button";

interface IState {
    imageInput: HTMLInputElement|null;
}

class ToolBox extends React.Component <IToolBoxProps,IState>{
    constructor(props:IToolBoxProps){
        super(props);

        this.state = {
            imageInput:null
        };

        this.setImageInputRef = this.setImageInputRef.bind(this);
        this.handleClickImageInput = this.handleClickImageInput.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
    }

    public render(){
        const {classes,onAddCircle,onAddRectangle,onAddLine} = this.props;
        return (
            <div className={classes.wrapper} >
                <Button onClick={this.handleClickImageInput} icon="I" classes={classes.button} tooltip={"Click to add an image"} />
                <Button onClick={onAddCircle} icon="C" classes={classes.button} tooltip={"Click to add a circle"} />
                <Button onClick={onAddRectangle} icon="R" classes={classes.button} tooltip={"Click to add a rectangle"} />
                <Button onClick={onAddLine} icon="L" classes={classes.button} tooltip={"Click to add a straight line"} />
                <input onChange={this.handleChangeImage} type="file" ref={this.setImageInputRef} />
            </div>
        );
    }

    private handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        const {onAddImage} = this.props;

        if (files && files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);

            e.target.value = "";

            reader.onload = () => {
                const result = reader.result;
                const img = new Image();

                img.src = result as string;

                img.onload = () => {
                    const imageInfo:IImageInfo = {
                        data: result as string,
                        size:{
                            height: img.naturalHeight,
                            width:img.naturalWidth,
                        },
                    };

                    if(onAddImage){
                        onAddImage(imageInfo);
                    }

                };
            };
        }
    }

    private handleClickImageInput(){
        const {imageInput} = this.state;

        if(imageInput){
            imageInput.click();
        }
    }

    private setImageInputRef(el:HTMLInputElement|null){
        if(el){
            this.setState({imageInput:el});
        }
    }
}

export default ToolBox;