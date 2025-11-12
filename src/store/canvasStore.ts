/**
 * Canvas Store
 * Zustand store for managing canvas state with history (undo/redo)
 */

import { create } from 'zustand';
import { produce } from 'immer';
import { CanvasState, CanvasSettings } from './types';
import { Element } from '../types/elements';
import { cloneElement } from '../utils/elementUtils';

const DEFAULT_CANVAS_SETTINGS: CanvasSettings = {
  width: 1080,
  height: 1350,
  backgroundColor: '#ffffff',
  backgroundImage: null,
};

/**
 * Maximum history stack size to prevent memory issues
 */
const MAX_HISTORY_SIZE = 50;

/**
 * Save current state to history before making changes
 */
const saveToHistory = (state: CanvasState): void => {
  const newPast = [...state.history.past, state.elements];
  
  // Limit history size
  if (newPast.length > MAX_HISTORY_SIZE) {
    newPast.shift();
  }
  
  state.history.past = newPast;
  state.history.future = []; // Clear future when new action is performed
};

export const useCanvasStore = create<CanvasState>((set, get) => ({
  // Initial state
  elements: [],
  selectedElementId: null,
  canvasSettings: DEFAULT_CANVAS_SETTINGS,
  history: {
    past: [],
    future: [],
  },

  // Element operations
  addElement: (element: Element) => {
    set(
      produce((state: CanvasState) => {
        saveToHistory(state);
        state.elements.push(element);
        state.selectedElementId = element.id;
      })
    );
  },

  updateElement: (id: string, updates: Partial<Element>) => {
    set(
      produce((state: CanvasState) => {
        saveToHistory(state);
        const index = state.elements.findIndex((el) => el.id === id);
        if (index !== -1) {
          state.elements[index] = { ...state.elements[index], ...updates } as Element;
        }
      })
    );
  },

  deleteElement: (id: string) => {
    set(
      produce((state: CanvasState) => {
        saveToHistory(state);
        state.elements = state.elements.filter((el) => el.id !== id);
        if (state.selectedElementId === id) {
          state.selectedElementId = null;
        }
      })
    );
  },

  duplicateElement: (id: string) => {
    set(
      produce((state: CanvasState) => {
        saveToHistory(state);
        const element = state.elements.find((el) => el.id === id);
        if (element) {
          const newElement = cloneElement(element);
          state.elements.push(newElement);
          state.selectedElementId = newElement.id;
        }
      })
    );
  },

  // Selection
  selectElement: (id: string | null) => {
    set({ selectedElementId: id });
  },

  // Layer management
  moveElementToIndex: (id: string, newIndex: number) => {
    set(
      produce((state: CanvasState) => {
        saveToHistory(state);
        const currentIndex = state.elements.findIndex((el) => el.id === id);
        if (currentIndex !== -1) {
          const [element] = state.elements.splice(currentIndex, 1);
          state.elements.splice(newIndex, 0, element);
        }
      })
    );
  },

  bringToFront: (id: string) => {
    const { elements } = get();
    const index = elements.findIndex((el) => el.id === id);
    if (index !== -1 && index < elements.length - 1) {
      get().moveElementToIndex(id, elements.length - 1);
    }
  },

  sendToBack: (id: string) => {
    const { elements } = get();
    const index = elements.findIndex((el) => el.id === id);
    if (index > 0) {
      get().moveElementToIndex(id, 0);
    }
  },

  // Canvas settings
  updateCanvasSettings: (settings: Partial<CanvasSettings>) => {
    set(
      produce((state: CanvasState) => {
        state.canvasSettings = { ...state.canvasSettings, ...settings };
      })
    );
  },

  // History operations
  undo: () => {
    set(
      produce((state: CanvasState) => {
        if (state.history.past.length === 0) return;

        const previous = state.history.past[state.history.past.length - 1];
        const newPast = state.history.past.slice(0, -1);

        state.history.future = [state.elements, ...state.history.future];
        state.history.past = newPast;
        state.elements = previous;
        
        // Clear selection if selected element no longer exists
        if (
          state.selectedElementId &&
          !previous.find((el) => el.id === state.selectedElementId)
        ) {
          state.selectedElementId = null;
        }
      })
    );
  },

  redo: () => {
    set(
      produce((state: CanvasState) => {
        if (state.history.future.length === 0) return;

        const next = state.history.future[0];
        const newFuture = state.history.future.slice(1);

        state.history.past = [...state.history.past, state.elements];
        state.history.future = newFuture;
        state.elements = next;
      })
    );
  },

  canUndo: () => {
    return get().history.past.length > 0;
  },

  canRedo: () => {
    return get().history.future.length > 0;
  },

  // Bulk operations
  clearCanvas: () => {
    set(
      produce((state: CanvasState) => {
        saveToHistory(state);
        state.elements = [];
        state.selectedElementId = null;
      })
    );
  },

  setElements: (elements: Element[]) => {
    set(
      produce((state: CanvasState) => {
        saveToHistory(state);
        state.elements = elements;
      })
    );
  },
}));
