import * as React from "react";

export interface ISize {
  width: number;
  height: number;
}

export interface IPosition {
  left: number;
  top: number;
}

// Items and behaviours

export interface IItem {
  position: IPosition;
  itemId?: number;
}

export interface IResizable {
  size: ISize;
  naturalSize: ISize;
}

export interface IHasRotate {
  rotate: number;
}

export interface IHasColor {
  color: string;
}

export interface IHasOutline {
  outlineWeight: number;
  outlineColor:string;
}

export type TextItem = IHasRotate &
  IItem &
  IHasColor &
  IHasRotate &{
    text: string;
    fontName: string;
    fontId: string | number;
    size: number;
    underline: boolean;
    italic: boolean;
    bold: boolean;
    type: "text";
  };

export type LineItem = IHasRotate &
  IItem &
  IHasOutline &
  IHasRotate & {
    type: "line";
  };

export type CircleItem = IHasRotate &
  IItem &
  IHasColor &
  IHasOutline &
  IResizable &
  IHasRotate & {
    type: "circle";
  };

export type RectangleItem = IHasRotate &
  IItem &
  IHasColor &
  IHasOutline &
  IResizable &
  IHasRotate & {
    type: "rectangle";
  };

export interface IImageInfo {
  size: ISize;
  data: string;
}

export type ImageItem = IHasRotate &
  IItem &
  IHasOutline &
  IResizable & {
    type: "image";
    data: string;
  };

export type BrushItem = IHasColor &
  IHasOutline &
  IItem & {
    type: "brush";
  };

export type DesignerItem =
  | TextItem
  | LineItem
  | CircleItem
  | RectangleItem
  | ImageItem
  | BrushItem;

export interface IDesignerItemComponent {
  selected:boolean;
  onSelect?:(e:React.MouseEvent)=>void;
  onRemove?:(e:React.MouseEvent)=>void;
}

// Style classes
export interface IToolBoxButtonClasses {
  wrapper: string;
  icon: string;
  tooltip: string;
}

export interface IToolBoxSwitchClasses {
  wrapper: {
    active: string;
    default: string;
  };
  icon: string;
  tooltip: string;
}

export interface IToolOptionClasses {
  wrapper: string;
}

export interface IToolBoxClasses {
  wrapper: string;
  button: IToolBoxButtonClasses;
  switch: IToolBoxSwitchClasses;
}

export interface IPaperClasses {
  wrapper: string;
}

export interface IDesignerClasses {
  wrapper: string;
  toolbox: IToolBoxClasses;
  toolOptions: IToolOptionClasses;
  paper: IPaperClasses;
}

// Props

export interface IDesignerProps {
  items: { [x: string]: DesignerItem };
  // Display or hide default toolbar
  // Make it false and use customButtons prop to bind events to your custom buttons
  showToolbar?: boolean;
  customButtons?: {
    textButton?: HTMLElement;
    brushButton?: HTMLElement;
    imageButton?: HTMLElement;
    circleButton?: HTMLElement;
    rectangleButton?: HTMLElement;
    lineButton?: HTMLElement;
  };
  // Features disable or enable
  features?: {
    text?: boolean;
    brush?: boolean;
    image?: boolean;
    circle?: boolean;
    rectangle?: boolean;
    line?: boolean;
  };
  // Styling classes
  classes?: {
    designer?: {
      wrapper?: string;
      toolbox?: {
        wrapper?: string;
        button?: {
          wrapper?: string;
          icon?: string;
          tooltip?: string;
        };
        switch?: {
          wrapper?: {
            active?: string;
            default?: string;
          };
          icon?: string;
          tooltip?: string;
        };
      };
      toolOptions?: {
        wrapper?: string;
      };
      paper?: {
        wrapper?: string;
      };
    };
  };
  // Calling when changing items
  onChangeItems: (items: { [x: string]: DesignerItem }) => void;

  paperSize?: ISize;
  itemInitSize?: ISize;
}

// Sub component props
export interface IToolBoxProps {
  classes: IToolBoxClasses;
  onAddImage?: (info: IImageInfo) => void;
  onAddCircle?: (e: React.MouseEvent) => void;
  onAddRectangle?: (e: React.MouseEvent) => void;
  onAddLine?:(e:React.MouseEvent)=>void;
  onAddText?:(e:React.MouseEvent)=>void;
}

export interface IToolBoxButtonProps {
  classes: IToolBoxButtonClasses;
  icon: JSX.Element;
  tooltip?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface IToolBoxSwitchProps {
  classes: IToolBoxSwitchClasses;
  icon: JSX.Element;
  tooltip: string;
  active: boolean;
  onToggle: (status: boolean) => void;
}

export interface IPaperProps {
  classes: IPaperClasses;
  height: number | string;
  width: number | string;
}

export interface IIconProps {
  height?: number;
  width?: number;
  className?: string;
}
