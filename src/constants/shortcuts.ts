/**
 * Keyboard Shortcuts Constants
 * Centralized keyboard shortcuts documentation
 */

export const KEYBOARD_SHORTCUTS = {
  // History
  UNDO: { key: 'Ctrl+Z', mac: 'Cmd+Z', description: 'Undo last action' },
  REDO: { key: 'Ctrl+Y', mac: 'Cmd+Shift+Z', description: 'Redo last action' },

  // Element operations
  DELETE: { key: 'Delete / Backspace', description: 'Delete selected element' },
  DUPLICATE: { key: 'Ctrl+D', mac: 'Cmd+D', description: 'Duplicate element' },
  DESELECT: { key: 'Escape', description: 'Deselect element' },

  // Layer management (future)
  BRING_FORWARD: { key: 'Ctrl+]', mac: 'Cmd+]', description: 'Bring forward' },
  SEND_BACKWARD: { key: 'Ctrl+[', mac: 'Cmd+[', description: 'Send backward' },
  BRING_TO_FRONT: {
    key: 'Ctrl+Shift+]',
    mac: 'Cmd+Shift+]',
    description: 'Bring to front',
  },
  SEND_TO_BACK: {
    key: 'Ctrl+Shift+[',
    mac: 'Cmd+Shift+[',
    description: 'Send to back',
  },

  // Selection (future)
  SELECT_ALL: { key: 'Ctrl+A', mac: 'Cmd+A', description: 'Select all' },

  // Grouping (future)
  GROUP: { key: 'Ctrl+G', mac: 'Cmd+G', description: 'Group elements' },
  UNGROUP: {
    key: 'Ctrl+Shift+G',
    mac: 'Cmd+Shift+G',
    description: 'Ungroup elements',
  },
};

/**
 * Get formatted shortcut string based on platform
 */
export const getShortcut = (shortcut: keyof typeof KEYBOARD_SHORTCUTS): string => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcutObj = KEYBOARD_SHORTCUTS[shortcut] as { key: string; mac?: string; description: string };
  return isMac && shortcutObj.mac ? shortcutObj.mac : shortcutObj.key;
};
