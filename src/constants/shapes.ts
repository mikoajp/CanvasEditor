/**
 * Shape Constants
 * Default values for shape elements
 */

export const DEFAULT_SHAPE = {
  fill: '#3b82f6',
  stroke: '#1e40af',
  strokeWidth: 2,
  opacity: 1,
  rotation: 0,
};

export const DEFAULT_RECTANGLE = {
  ...DEFAULT_SHAPE,
  borderRadius: 0,
};

export const DEFAULT_CIRCLE = {
  ...DEFAULT_SHAPE,
};

export const DEFAULT_TRIANGLE = {
  ...DEFAULT_SHAPE,
};

export const DEFAULT_STAR = {
  ...DEFAULT_SHAPE,
  pointCount: 5,
};

export const DEFAULT_LINE = {
  fill: 'none',
  stroke: '#1e40af',
  strokeWidth: 2,
  opacity: 1,
};

export const SHAPE_SIZES = {
  rectangle: { width: 200, height: 150 },
  circle: { width: 150, height: 150 },
  triangle: { width: 150, height: 150 },
  star: { width: 150, height: 150 },
  line: { width: 200, height: 2 },
};
