/**
 * Shape Types
 * Type definitions for geometric shapes
 */

export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star' | 'line';

export interface ShapeElement {
  id: string;
  type: ShapeType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  rotation?: number;
  borderRadius?: number; // Only for rectangle
  // For specific shapes
  points?: string; // For triangle, star (SVG path)
}

export interface RectangleElement extends ShapeElement {
  type: 'rectangle';
  borderRadius?: number;
}

export interface CircleElement extends ShapeElement {
  type: 'circle';
}

export interface TriangleElement extends ShapeElement {
  type: 'triangle';
  points: string;
}

export interface StarElement extends ShapeElement {
  type: 'star';
  points: string;
  pointCount?: number;
}

export interface LineElement extends ShapeElement {
  type: 'line';
}
