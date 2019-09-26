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
