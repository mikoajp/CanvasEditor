/**
 * Store Types
 * Centralized TypeScript types for Zustand store
 */

import { Element } from '../types/elements';

export interface CanvasSettings {
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImage: string | null;
}

export interface HistoryState {
  past: Element[][];
  present: Element[];
  future: Element[][];
}

export interface LayerState {
  hiddenLayers: Set<string>;
  lockedLayers: Set<string>;
}

export interface CanvasState {
  // Core state
  elements: Element[];
  selectedElementId: string | null;
  canvasSettings: CanvasSettings;
  layerState: LayerState;
  
  // History
  history: {
    past: Element[][];
    future: Element[][];
  };
  
  // Actions - Element operations
  addElement: (element: Element) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  
  // Actions - Selection
  selectElement: (id: string | null) => void;
  
  // Actions - Layer management
  moveElementToIndex: (id: string, newIndex: number) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  toggleLayerVisibility: (id: string) => void;
  toggleLayerLock: (id: string) => void;
  isLayerHidden: (id: string) => boolean;
  isLayerLocked: (id: string) => boolean;
  
  // Actions - Canvas settings
  updateCanvasSettings: (settings: Partial<CanvasSettings>) => void;
  
  // Actions - History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Actions - Bulk operations
  clearCanvas: () => void;
  setElements: (elements: Element[]) => void;
}
