/**
 * Keyboard Shortcuts Hook
 * Handles global keyboard shortcuts for the canvas editor
 */

import { useEffect } from 'react';
import { useCanvasStore } from '../store/canvasStore';

export const useKeyboardShortcuts = () => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    deleteElement,
    duplicateElement,
    selectedElementId,
  } = useCanvasStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Undo: Ctrl+Z (Windows/Linux) or Cmd+Z (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        if (canUndo()) {
          e.preventDefault();
          undo();
        }
      }

      // Redo: Ctrl+Y (Windows/Linux) or Cmd+Shift+Z (Mac)
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
      ) {
        if (canRedo()) {
          e.preventDefault();
          redo();
        }
      }

      // Delete: Delete or Backspace (only when not typing)
      if (
        !isTyping &&
        (e.key === 'Delete' || e.key === 'Backspace') &&
        selectedElementId
      ) {
        e.preventDefault();
        deleteElement(selectedElementId);
      }

      // Duplicate: Ctrl+D or Cmd+D
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedElementId) {
        e.preventDefault();
        duplicateElement(selectedElementId);
      }

      // Deselect: Escape
      if (e.key === 'Escape' && selectedElementId) {
        e.preventDefault();
        useCanvasStore.getState().selectElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    undo,
    redo,
    canUndo,
    canRedo,
    deleteElement,
    duplicateElement,
    selectedElementId,
  ]);
};
