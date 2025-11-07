/**
 * Default Constants
 * Default values for elements and canvas settings
 */

export const DEFAULT_TEXT_ELEMENT = {
  content: 'Double click to edit',
  fontSize: 24,
  fontFamily: 'Inter',
  color: '#000000',
  fontWeight: 400 as const,
  fontStyle: 'normal' as const,
  textDecoration: 'none' as const,
  textAlign: 'left' as const,
  lineHeight: 1.4,
  letterSpacing: 0,
  opacity: 1,
};

export const DEFAULT_IMAGE_ELEMENT = {
  opacity: 1,
};

export const DEFAULT_SHAPE_ELEMENT = {
  fill: '#3b82f6',
  stroke: '#1e40af',
  strokeWidth: 2,
  opacity: 1,
};

export const DEFAULT_ELEMENT_SIZE = {
  text: { width: 200, height: 50 },
  image: { width: 200, height: 200 },
  rectangle: { width: 200, height: 150 },
  circle: { width: 150, height: 150 },
  triangle: { width: 150, height: 150 },
};

export const DEFAULT_ELEMENT_POSITION = {
  x: 100,
  y: 100,
};

export const CANVAS_SETTINGS = {
  width: 1080,
  height: 1350,
  backgroundColor: '#ffffff',
  minZoom: 0.1,
  maxZoom: 5,
  defaultZoom: 1,
};
