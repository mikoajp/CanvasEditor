import { useState, useRef, useEffect } from 'react';

import Toolbar from '../Toolbar/Toolbar';
import LayersPanel from '../Layers/LayersPanel';
import TextElementComponent from '../Element/TextElement';
import ImageElementComponent from '../Element/ImageElement';
import ResetModal from './ResetModal';
import CanvasPlaceholder from './CanvasPlaceholder';
import { createHandlers } from './CanvasHandlers';
import { useCanvasStore } from '../../store/canvasStore';
import '../../styles/Canvas.scss';

export interface Background {
    type: 'color' | 'image';
    value: string;
}

const Canvas = () => {
    // Zustand store
    const elements = useCanvasStore((state) => state.elements);
    const selectedId = useCanvasStore((state) => state.selectedElementId);
    const canvasSettings = useCanvasStore((state) => state.canvasSettings);
    const selectElement = useCanvasStore((state) => state.selectElement);

    const deleteElement = useCanvasStore((state) => state.deleteElement);


    // Local UI state (not part of history)
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [showResetModal, setShowResetModal] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Backward compatibility for background (will be refactored later)
    const background: Background = {
        type: canvasSettings.backgroundImage ? 'image' : 'color',
        value: canvasSettings.backgroundImage || canvasSettings.backgroundColor,
    };

    // Click outside to deselect
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!canvasRef.current) return;
            const toolbar = document.querySelector('.toolbar');
            const layersPanel = document.querySelector('.layers-panel');
            if (toolbar?.contains(e.target as Node) || layersPanel?.contains(e.target as Node)) {
                return; // ignore clicks inside toolbar or layers
            }
            if (canvasRef.current === e.target) {
                selectElement(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectElement]);

    const handlers = createHandlers({
        setShowResetModal,
        setIsDragging,
        setStartPos,
        selectedId,
        isDragging,
        startPos,
        background,
        canvasRef
    });

    return (
        <div className="canvas-editor">
            <Toolbar
                onReset={handlers.handleReset}
                onAddText={handlers.handleAddText}
                onAddImage={handlers.handleAddImage}
                onSetBackgroundImage={handlers.handleSetBackgroundImage}
                onExport={handlers.handleExport}
            />
            
            <div className="canvas-area">
                <div
                    className="canvas"
                    ref={canvasRef}
                    style={{
                        backgroundColor: background.type === 'color' ? background.value : undefined,
                        backgroundImage: background.type === 'image' ? `url(${background.value})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    onMouseMove={handlers.handleMouseMove}
                    onMouseUp={handlers.handleMouseUp}
                >
                    {elements.length === 0 && <CanvasPlaceholder />}

                    {elements.map((element) => {
                        if (element.type === 'text') {
                            return (
                                <TextElementComponent
                                    key={element.id}
                                    id={element.id}
                                    content={element.content}
                                    position={element.position}
                                    size={element.size}
                                    color={element.color}
                                    fontSize={element.fontSize}
                                    fontFamily={element.fontFamily}
                                    fontWeight={element.fontWeight}
                                    fontStyle={element.fontStyle}
                                    textDecoration={element.textDecoration}
                                    textAlign={element.textAlign}
                                    lineHeight={element.lineHeight}
                                    opacity={element.opacity}
                                    isSelected={selectedId === element.id}
                                    onSelect={selectElement}
                                    onDeselect={handlers.handleDeselect}
                                    onDragStart={handlers.handleMouseDown}
                                    onContentChange={handlers.handleContentChange}
                                    onColorChange={handlers.handleColorChange}
                                    onResize={handlers.handleResize}
                                    onDelete={() => deleteElement(element.id)}
                                />
                            );
                        }
                        if (element.type === 'image') {
                            return (
                                <ImageElementComponent
                                    key={element.id}
                                    id={element.id}
                                    src={element.src}
                                    position={element.position}
                                    size={element.size}
                                    isSelected={selectedId === element.id}
                                    onSelect={selectElement}
                                    onDeselect={handlers.handleDeselect}
                                    onDragStart={handlers.handleMouseDown}
                                    onResize={handlers.handleResize}
                                    onDelete={() => deleteElement(element.id)}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <LayersPanel />

            <ResetModal
                isOpen={showResetModal}
                onConfirm={handlers.handleConfirmReset}
                onCancel={handlers.handleCancelReset}
            />
        </div>
    );
};

export default Canvas;
