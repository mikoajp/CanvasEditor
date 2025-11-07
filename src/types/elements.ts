import { ShapeElement } from './shapes';

export type CanvasElement = TextElement | ImageElement | ShapeElement;

export interface TextElement {
    id: string;
    type: 'text';
    content: string;
    color: string;
    fontSize: number;
    fontFamily?: string;
    fontWeight?: number | 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline' | 'line-through';
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    lineHeight?: number;
    letterSpacing?: number;
    opacity?: number;
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

// Base element interface
export type Element = CanvasElement;