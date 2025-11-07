import React, { ChangeEvent } from 'react';
import { Type, Image as ImageIcon, RotateCcw, Undo, Redo, Copy, Square, Circle, Triangle } from 'lucide-react';
import { useCanvasStore } from '../../store/canvasStore';
import TextControls from '../Element/TextControls';
import ShapeControls from '../Elements/ShapeControls';
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
    
    // Get selected element
    const selectedElement = elements.find(el => el.id === selectedElementId);
    const isTextSelected = selectedElement?.type === 'text';
<<<<<<< HEAD
    const isShapeSelected = selectedElement && selectedElement.type !== 'text' && selectedElement.type !== 'image';
=======
    const isShapeSelected = selectedElement && ['rectangle', 'circle', 'triangle', 'star', 'line'].includes(selectedElement.type);
>>>>>>> e374285 (feat(shapes): dodaj figury (prostokąt, koło, trójkąt) do edytora\n\n- Canvas: renderowanie Rectangle/Circle/Triangle + wsparcie zaznaczania, przeciągania, zmiany rozmiaru i usuwania\n- CanvasHandlers: handleAddRectangle/handleAddCircle/handleAddTriangle z wykorzystaniem shapeFactory\n- Toolbar: sekcja Shapes, przyciski dodawania figur oraz ShapeControls widoczne dla wybranych kształtów\n- LayersPanel: wsparcie dla nowych typów elementów\n- Styles: aktualizacje Toolbar.scss oraz dodane Style dla kształtów (ShapeControls.scss, ShapeElement.scss)\n- Types: rozszerzenie CanvasElement o ShapeElement\n- Constants/Utils: stałe kształtów i fabryka kształtów)

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

    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <span className="logo">CanvasEditor</span>
                <button className="reset-button" onClick={onReset}>
                    Reset <RotateCcw size={16} />
                </button>
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