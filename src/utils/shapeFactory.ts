/**
 * Shape Factory
 * Factory functions for creating shape elements
 */

import { ShapeElement } from '../types/shapes';
import { DEFAULT_RECTANGLE, DEFAULT_CIRCLE, DEFAULT_TRIANGLE, SHAPE_SIZES } from '../constants/shapes';

export const createRectangle = (position = { x: 100, y: 100 }): ShapeElement => {
  return {
    id: `rectangle-${Date.now()}`,
    type: 'rectangle',
    position,
    size: SHAPE_SIZES.rectangle,
    ...DEFAULT_RECTANGLE,
  };
};

export const createCircle = (position = { x: 100, y: 100 }): ShapeElement => {
  return {
    id: `circle-${Date.now()}`,
    type: 'circle',
    position,
    size: SHAPE_SIZES.circle,
    ...DEFAULT_CIRCLE,
  };
};

export const createTriangle = (position = { x: 100, y: 100 }): ShapeElement => {
  // Calculate triangle points (equilateral triangle)
  const { width, height } = SHAPE_SIZES.triangle;
  const points = `${width / 2},0 ${width},${height} 0,${height}`;
  
  return {
    id: `triangle-${Date.now()}`,
    type: 'triangle',
    position,
    size: SHAPE_SIZES.triangle,
    points,
    ...DEFAULT_TRIANGLE,
  };
};

export const createStar = (position = { x: 100, y: 100 }): ShapeElement => {
  const { width, height } = SHAPE_SIZES.star;
  // Star with 5 points
  const points = generateStarPoints(width / 2, height / 2, 5, width / 2, width / 4);
  
  return {
    id: `star-${Date.now()}`,
    type: 'star',
    position,
    size: SHAPE_SIZES.star,
    points,
    ...DEFAULT_TRIANGLE,
  };
};

/**
 * Generate star points for SVG polygon
 */
function generateStarPoints(
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
): string {
  const points: string[] = [];
  const step = Math.PI / spikes;

  for (let i = 0; i < 2 * spikes; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    points.push(`${x},${y}`);
  }

  return points.join(' ');
}
