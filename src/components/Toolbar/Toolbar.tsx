import React, { ChangeEvent } from 'react';
import { Type, Image as ImageIcon, RotateCcw, Undo, Redo, Copy, Square, Circle, Triangle, Save, Download, Upload } from 'lucide-react';
import { useCanvasStore } from '../../store/canvasStore';
import TextControls from '../Element/TextControls';
import ShapeControls from '../Elements/ShapeControls';
import { loadProjectFromFile } from '../../utils/projectStorage';
import '../.././styles/Toolbar.scss';

interface ToolbarProps {
    onAddText: () => void;
    onAddImage: (file: File) => void;
    onAddRectangle: () => void;
    onAddCircle: () => void;
    onAddTriangle: () => void;
    onSetBackgroundImage: (file: File) => void;
    onExport: () => void;
    onReset: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
                                             onAddText,
                                             onAddImage,
                                             onAddRectangle,
                                             onAddCircle,
                                             onAddTriangle,
                                             onSetBackgroundImage,
                                             onExport,
                                             onReset
                                         }) => {
    // Get history state from store
    const undo = useCanvasStore((state) => state.undo);
    const redo = useCanvasStore((state) => state.redo);
    const canUndo = useCanvasStore((state) => state.canUndo);
    const canRedo = useCanvasStore((state) => state.canRedo);
    const selectedElementId = useCanvasStore((state) => state.selectedElementId);
    const duplicateElement = useCanvasStore((state) => state.duplicateElement);
    const elements = useCanvasStore((state) => state.elements);
    const updateElement = useCanvasStore((state) => state.updateElement);
    const saveProject = useCanvasStore((state) => state.saveProject);
    const exportProject = useCanvasStore((state) => state.exportProject);
    const loadProject = useCanvasStore((state) => state.loadProject);
    
    // Get selected element
    const selectedElement = elements.find(el => el.id === selectedElementId);
    const isTextSelected = selectedElement?.type === 'text';
    const isShapeSelected = selectedElement && selectedElement.type !== 'text' && selectedElement.type !== 'image';

    const handleBackgroundImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onSetBackgroundImage(file);
    };

    const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onAddImage(file);
    };

    const handleDuplicate = () => {
        if (selectedElementId) {
            duplicateElement(selectedElementId);
        }
    };

    const handleSave = () => {
        saveProject();
        alert('Project saved to browser storage!');
    };

    const handleExportJSON = () => {
        const projectName = prompt('Enter project name:', 'canvas-project');
        if (projectName) {
            exportProject(projectName);
        }
    };

    const handleLoadProject = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const projectData = await loadProjectFromFile(file);
            if (projectData) {
                loadProject(
                    projectData.elements,
                    projectData.canvasSettings,
                    projectData.layerState.hiddenLayers,
                    projectData.layerState.lockedLayers
                );
                alert(`Project "${projectData.metadata.name}" loaded successfully!`);
            } else {
                alert('Failed to load project. Invalid file format.');
            }
        }
        // Reset file input
        e.target.value = '';
    };

    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <span className="logo">CanvasEditor</span>
                <button className="reset-button" onClick={onReset}>
                    Reset <RotateCcw size={16} />
                </button>
            </div>

            {/* Project Controls */}
            <div className="project-section">
                <div className="section-header">
                    <h3>Project</h3>
                </div>
                <div className="tools-grid">
                    <button 
                        onClick={handleSave}
                        className="tool-item"
                        title="Save to Browser Storage"
                    >
                        <Save size={20} />
                        <span>Save</span>
                    </button>
                    <button 
                        onClick={handleExportJSON}
                        className="tool-item"
                        title="Export to JSON"
                    >
                        <Download size={20} />
                        <span>Export</span>
                    </button>
                    <label className="tool-item" title="Load Project">
                        <Upload size={20} />
                        <span>Load</span>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleLoadProject}
                            hidden
                        />
                    </label>
                </div>
            </div>

            {/* History Controls */}
            <div className="history-section">
                <div className="section-header">
                    <h3>History</h3>
                </div>
                <div className="tools-grid">
                    <button 
                        onClick={undo} 
                        className="tool-item"
                        disabled={!canUndo()}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={20} />
                        <span>Undo</span>
                    </button>
                    <button 
                        onClick={redo} 
                        className="tool-item"
                        disabled={!canRedo()}
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo size={20} />
                        <span>Redo</span>
                    </button>
                    <button 
                        onClick={handleDuplicate} 
                        className="tool-item"
                        disabled={!selectedElementId}
                        title="Duplicate (Ctrl+D)"
                    >
                        <Copy size={20} />
                        <span>Duplicate</span>
                    </button>
                </div>
            </div>

            <div className="add-content-section">
                <div className="section-header">
                    <h3>Add content</h3>
                </div>

                <div className="tools-grid">
                    <button onClick={onAddText} className="tool-item">
                        <Type size={20} />
                        <span>Text</span>
                    </button>

                    <label className="tool-item">
                        <ImageIcon size={20} />
                        <span>Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageAdd}
                            hidden
                        />
                    </label>

                    <label className="tool-item">
                        <ImageIcon size={20} />
                        <span>Background</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundImage}
                            hidden
                        />
                    </label>
                </div>
            </div>

            {/* Shapes Section */}
            <div className="shapes-section">
                <div className="section-header">
                    <h3>Shapes</h3>
                </div>
                <div className="tools-grid">
                    <button onClick={onAddRectangle} className="tool-item" title="Add Rectangle">
                        <Square size={20} />
                        <span>Rectangle</span>
                    </button>
                    <button onClick={onAddCircle} className="tool-item" title="Add Circle">
                        <Circle size={20} />
                        <span>Circle</span>
                    </button>
                    <button onClick={onAddTriangle} className="tool-item" title="Add Triangle">
                        <Triangle size={20} />
                        <span>Triangle</span>
                    </button>
                </div>
            </div>

            {/* Text Controls - Show when text element is selected */}
            {isTextSelected && selectedElement && (
                <div className="text-formatting-section">
                    <div className="section-header">
                        <h3>Text Formatting</h3>
                    </div>
                    <TextControls
                        elementId={selectedElement.id}
                        fontFamily={selectedElement.fontFamily}
                        fontSize={selectedElement.fontSize}
                        fontWeight={selectedElement.fontWeight}
                        fontStyle={selectedElement.fontStyle}
                        textDecoration={selectedElement.textDecoration}
                        textAlign={selectedElement.textAlign}
                        lineHeight={selectedElement.lineHeight}
                        opacity={selectedElement.opacity}
                        color={selectedElement.color}
                        onUpdate={updateElement}
                    />
                </div>
            )}

            {/* Shape Controls - Show when shape element is selected */}
            {isShapeSelected && selectedElement && (
                <div className="shape-formatting-section">
                    <div className="section-header">
                        <h3>Shape Properties</h3>
                    </div>
                    <ShapeControls
                        element={selectedElement}
                        onUpdate={updateElement}
                    />
                </div>
            )}

            <button className="export-button" onClick={onExport}>
                Export to PNG
            </button>
        </div>
    );
};

export default Toolbar;