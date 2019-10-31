import * as React from "react";
import { DeepPartial } from "ts-essentials";
import { string } from "prop-types";

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
  IHasColor &
  {
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
  IHasRotate &
  IResizable & {
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

export type ResizableItem = CircleItem | RectangleItem | ImageItem | LineItem;

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
  drawingArea: IPaperDrawingAreaClasses;
}

export interface IPaperDrawingAreaClasses {
  wrapper: string;
  item: IPaperItemClasses;
}

export interface IPaperItemClasses {
  wrapper: string;
  closeButton: string;
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
  // Calling when changing items
  onChangeItems: (items: { [x: string]: DesignerItem }) => void;

  paperSize?: ISize;
  itemInitSize?: ISize;

  drawingArea?: IPosition[];
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
}

export interface IToolBoxButtonProps {
  active?: boolean;
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
