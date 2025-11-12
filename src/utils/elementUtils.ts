/**
 * Element Utilities
 * Helper functions for element validation and ID generation
 */

import { Element } from '../types/elements';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique ID for an element
 * Uses UUID v4 for better uniqueness than timestamp
 */
export const generateElementId = (type: string): string => {
  return `${type}-${uuidv4()}`;
};

/**
 * Validate element position is within canvas bounds
 */
export const validatePosition = (
  position: { x: number; y: number },
  canvasWidth: number = 1080,
  canvasHeight: number = 1350
): { x: number; y: number } => {
  return {
    x: Math.max(0, Math.min(position.x, canvasWidth)),
    y: Math.max(0, Math.min(position.y, canvasHeight)),
  };
};

/**
 * Validate element size
 */
export const validateSize = (
  size: { width: number; height: number },
  minWidth: number = 10,
  minHeight: number = 10,
  maxWidth: number = 1080,
  maxHeight: number = 1350
): { width: number; height: number } => {
  return {
    width: Math.max(minWidth, Math.min(size.width, maxWidth)),
    height: Math.max(minHeight, Math.min(size.height, maxHeight)),
  };
};

/**
 * Check if two elements overlap
 */
export const doElementsOverlap = (
  el1: Element,
  el2: Element
): boolean => {
  const rect1 = {
    left: el1.position.x,
    right: el1.position.x + el1.size.width,
    top: el1.position.y,
    bottom: el1.position.y + el1.size.height,
  };

  const rect2 = {
    left: el2.position.x,
    right: el2.position.x + el2.size.width,
    top: el2.position.y,
    bottom: el2.position.y + el2.size.height,
  };

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

/**
 * Get element center point
 */
export const getElementCenter = (element: Element): { x: number; y: number } => {
  return {
    x: element.position.x + element.size.width / 2,
    y: element.position.y + element.size.height / 2,
  };
};

/**
 * Calculate distance between two elements
 */
export const getElementDistance = (el1: Element, el2: Element): number => {
  const center1 = getElementCenter(el1);
  const center2 = getElementCenter(el2);
  
  return Math.sqrt(
    Math.pow(center2.x - center1.x, 2) + Math.pow(center2.y - center1.y, 2)
  );
};

/**
 * Clone element with new ID
 */
export const cloneElement = (element: Element): Element => {
  return {
    ...element,
    id: generateElementId(element.type),
    position: {
      x: element.position.x + 20,
      y: element.position.y + 20,
    },
  };
};
