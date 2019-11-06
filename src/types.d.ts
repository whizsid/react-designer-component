import * as React from "react";
import { DeepPartial } from "ts-essentials";
import { string } from "prop-types";
import { RGBColor } from "react-color";

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
  ables: {
    rotate: boolean;
    move: boolean;
    resize: boolean;
    close: boolean;
    outline: boolean;
    color: boolean;
  };
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
  outlineColor: string;
}

export type TextItem = IHasRotate &
  IItem &
  IHasColor & {
    text: string;
    fontName: string;
    fontId: string | number;
    fontSize: number;
    underline: boolean;
    italic: boolean;
    bold: boolean;
    type: "text";
  };

export type LineItem = IHasRotate &
  IItem &
  IHasOutline &
  IHasRotate & {
    naturalWidth: number;
    type: "line";
    width: number;
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

export type BrushItem = IHasOutline &
  IItem &
  IHasRotate & {
    type: "brush";
    positions: IPosition[];
    naturalPosition: IPosition;
  };

export type DesignerItem =
  | TextItem
  | LineItem
  | CircleItem
  | RectangleItem
  | ImageItem
  | BrushItem;

export type ResizableItem = CircleItem | RectangleItem | ImageItem;

export type RotatableItem =
  | TextItem
  | LineItem
  | CircleItem
  | RectangleItem
  | ImageItem;

export interface IDesignerItemComponent {
  classes: IPaperItemClasses;
  selected: boolean;
  onSelect?: (e: React.MouseEvent<HTMLElement>) => void;
  onRemove?: (e: React.MouseEvent) => void;
}

// Style classes

export interface IStyleClasses {
  designer: IDesignerClasses;
}

export interface IToolBoxButtonClasses {
  wrapper: {
    active: string;
    default: string;
  };
  icon: string;
  tooltip: string;
}

export interface IToolOptionsColorPickerClasses {
  wrapper: string;
  picker: string;
  fill: string;
  outline: string;
  okButton: string;
}

export interface IToolOptionsNumberInputClasses {
  wrapper:string;
  label:string;
  input: string;
}

export interface IToolOptionsIconClasses {
  active: string;
  default: string;
}

export interface IToolOptionClasses {
  wrapper: string;
  colorPicker: IToolOptionsColorPickerClasses;
  fontPicker: string;
  fontSize: IToolOptionsNumberInputClasses;
  outlineWeight: IToolOptionsNumberInputClasses;
  italicIcon: IToolOptionsIconClasses;
  boldIcon: IToolOptionsIconClasses;
  underlineIcon: IToolOptionsIconClasses;
}

export interface IToolBoxClasses {
  wrapper: string;
  button: IToolBoxButtonClasses;
}

export interface IPaperClasses {
  wrapper: string;
  drawingArea: IPaperDrawingAreaClasses;
}

export interface IPaperDrawingAreaClasses {
  wrapper: string;
  item: IPaperItemClasses;
}

export interface IPaperItemClasses {
  wrapper: string;
  closeButton: string;
  line: string;
  text: string;
  rectangle: string;
  circle: string;
  brush: string;
  image: string;
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
  classes?: DeepPartial<IStyleClasses>;
  className?: string;
  // Calling when changing items
  onChangeItems: (items: { [x: string]: DesignerItem }) => void;

  paperSize?: ISize;

  drawingArea?: IPosition[];
  // Provide your Google Font API key if you using the text feature
  fontApiKey?:string;
}

// Sub component props
export interface IToolBoxProps {
  classes: IToolBoxClasses;
  mode?: DesignerItem["type"];
  onAddImage?: (info: IImageInfo) => void;
  onAddCircle?: (e: React.MouseEvent) => void;
  onAddRectangle?: (e: React.MouseEvent) => void;
  onAddLine?: (e: React.MouseEvent) => void;
  onAddText?: (e: React.MouseEvent) => void;
  onAddBrush?: (e: React.MouseEvent) => void;
}

export interface IToolBoxButtonProps {
  active?: boolean;
  classes: IToolBoxButtonClasses;
  icon: JSX.Element;
  tooltip?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface IToolOptionsProps {
  classes: IToolOptionClasses;
  onChangeFillColor?: (color: string) => void;
  onChangeOutlineColor?: (color: string) => void;
  onChangeFont?: (font:string)=>void;
  onChangeFontSize?: (fontSize:number)=>void;
  onChangeOutlineWeight?: (outline:number)=>void;
  onToggleItalic?:(italic:boolean)=>void;
  onToggleBold?:(bold:boolean)=>void;
  onToggleUnderline?:(bold:boolean)=>void;
  fillColor?: string;
  outlineColor?: string;
  font: string;
  fontApiKey: string;
  italic:boolean;
  bold: boolean;
  underline: boolean;
  fontSize: number;
  outlineWeight: number;
  mode?: DesignerItem["type"]
}

export interface IToolOptionsColorPickerProps {
  classes: IToolOptionsColorPickerClasses;
  onChangeFillColor?: (color: string) => void;
  onChangeOutlineColor?: (color: string) => void;
  fillColor?: string;
  outlineColor?: string;
}

export interface IPaperProps {
  classes: IPaperClasses;
  height: number;
  width: number;
  items: { [x: string]: DesignerItem };
  selectedItem?: DesignerItem;
  area: IPosition[];
  cursor?: React.CSSProperties["cursor"];
  onChangeItem?: (item: DesignerItem) => void;
  onRemoveItem?: (item: DesignerItem) => void;
  onSelectItem?: (item?: DesignerItem) => void;
  onMouseDown?: (position: IPosition) => void;
  onMouseMove?: (position: IPosition) => void;
  onMouseUp?: (position: IPosition) => void;
}

export interface IIconProps {
  height?: number;
  width?: number;
  className?: string;
}
