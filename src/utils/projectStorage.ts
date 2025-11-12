/**
 * Project Storage Utilities
 * Functions for saving and loading canvas projects as JSON
 */

import { Element } from '../types/elements';
import { CanvasSettings } from '../store/types';

export interface ProjectData {
  version: string;
  elements: Element[];
  canvasSettings: CanvasSettings;
  layerState: {
    hiddenLayers: string[];
    lockedLayers: string[];
  };
  metadata: {
    createdAt: string;
    modifiedAt: string;
    name: string;
  };
}

/**
 * Export project to JSON format
 */
export const exportProjectToJSON = (
  elements: Element[],
  canvasSettings: CanvasSettings,
  hiddenLayers: Set<string>,
  lockedLayers: Set<string>,
  projectName: string = 'Untitled Project'
): string => {
  const projectData: ProjectData = {
    version: '1.0.0',
    elements,
    canvasSettings,
    layerState: {
      hiddenLayers: Array.from(hiddenLayers),
      lockedLayers: Array.from(lockedLayers),
    },
    metadata: {
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      name: projectName,
    },
  };

  return JSON.stringify(projectData, null, 2);
};

/**
 * Parse and validate imported project JSON
 */
export const parseProjectJSON = (jsonString: string): ProjectData | null => {
  try {
    const data = JSON.parse(jsonString) as ProjectData;

    // Basic validation
    if (!data.version || !data.elements || !data.canvasSettings) {
      console.error('Invalid project format: missing required fields');
      return null;
    }

    if (!Array.isArray(data.elements)) {
      console.error('Invalid project format: elements must be an array');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to parse project JSON:', error);
    return null;
  }
};

/**
 * Download project as JSON file
 */
export const downloadProject = (
  elements: Element[],
  canvasSettings: CanvasSettings,
  hiddenLayers: Set<string>,
  lockedLayers: Set<string>,
  projectName: string = 'canvas-project'
): void => {
  const jsonString = exportProjectToJSON(
    elements,
    canvasSettings,
    hiddenLayers,
    lockedLayers,
    projectName
  );

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Load project from file
 */
export const loadProjectFromFile = (file: File): Promise<ProjectData | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        const projectData = parseProjectJSON(e.target.result as string);
        resolve(projectData);
      } else {
        resolve(null);
      }
    };

    reader.onerror = () => {
      console.error('Failed to read file');
      resolve(null);
    };

    reader.readAsText(file);
  });
};

/**
 * Save project to localStorage
 */
export const saveProjectToLocalStorage = (
  elements: Element[],
  canvasSettings: CanvasSettings,
  hiddenLayers: Set<string>,
  lockedLayers: Set<string>,
  key: string = 'canvas-project-autosave'
): void => {
  try {
    const jsonString = exportProjectToJSON(
      elements,
      canvasSettings,
      hiddenLayers,
      lockedLayers,
      'Autosave'
    );
    localStorage.setItem(key, jsonString);
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Load project from localStorage
 */
export const loadProjectFromLocalStorage = (
  key: string = 'canvas-project-autosave'
): ProjectData | null => {
  try {
    const jsonString = localStorage.getItem(key);
    if (!jsonString) {
      return null;
    }
    return parseProjectJSON(jsonString);
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};
