export interface IItem {
  left: number;
  right: number;
  itemId?: number;
}

export interface IResizable {
  height: number;
  naturalHeight: number;
  naturalWeight: number;
  width: number;
}

export interface IHasRotate {
  rotate: number;
}

export interface IHasColor {
  color: string;
}

export interface IHasOutline {
  outlineWeight: number;
}

export type TextItem = IHasRotate &
  IItem &
  IHasColor &
  IHasOutline & {
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
  IHasColor &
  IHasOutline & {
    type: "line";
  };

export type CircleItem = IHasRotate &
  IItem &
  IHasColor &
  IHasOutline & {
    type: "circle";
  };

export type RectangleItem = IHasRotate &
  IItem &
  IHasColor &
  IHasOutline & {
    type: "rectangle";
  };

export type ImageItem = IHasRotate &
  IItem &
  IHasOutline & {
    type: "image";
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

export interface IDesignerProps {
  items: DesignerItem[];
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
  onChangeItems: (items: DesignerItem[]) => void;

  paperHeight?: string|number;
  paperWidth?: string|number;
}

// Style classes
interface IToolOptionClasses {
  wrapper:string;
}

interface IToolBoxClasses {
  wrapper:string;
}

interface IPaperClasses {
  wrapper:string;
}

interface IDesignerClasses {
  wrapper:string;
  toolbox: IToolBoxClasses;
  toolOptions: IToolOptionClasses;
  paper: IPaperClasses;
}
