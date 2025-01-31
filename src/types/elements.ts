export type CanvasElement = TextElement | ImageElement;

export interface TextElement {
    id: string;
    type: 'text';
    content: string;
    color: string;
    fontSize: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

export interface ImageElement {
    id: string;
    type: 'image';
    src: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
}