import { useState, useRef, useEffect } from 'react';
import { CanvasElement } from '../../types/elements';
import Toolbar from '../Toolbar/Toolbar';
import TextElementComponent from '../Element/TextElement';
import ImageElementComponent from '../Element/ImageElement';
import ResetModal from './ResetModal';
import CanvasPlaceholder from './CanvasPlaceholder';
import { createHandlers } from './CanvasHandlers';
import '../../styles/Canvas.scss';

export interface Background {
    type: 'color' | 'image';
    value: string;
}


const Canvas = () => {
    const [elements, setElements] = useState<CanvasElement[]>([]);
    const [background, setBackground] = useState<Background>({ type: 'color', value: '#ffffff' });
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [showResetModal, setShowResetModal] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (canvasRef.current === e.target) {
                setSelectedId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlers = createHandlers({
        setElements,
        setBackground,
        setSelectedId,
        setShowResetModal,
        setIsDragging,
        setStartPos,
        elements,
        selectedId,
        isDragging,
        startPos,
        background,
        canvasRef
    });

    return (
        <div className="canvas-editor">
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
                                    {...element}
                                    isSelected={selectedId === element.id}
                                    onSelect={setSelectedId}
                                    onDeselect={handlers.handleDeselect}
                                    onDragStart={handlers.handleMouseDown}
                                    onContentChange={handlers.handleContentChange}
                                    onColorChange={handlers.handleColorChange}
                                    onResize={handlers.handleResize}
                                    onDelete={handlers.handleDelete}
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
                                    onSelect={setSelectedId}
                                    onDeselect={handlers.handleDeselect}
                                    onDragStart={handlers.handleMouseDown}
                                    onResize={handlers.handleResize}
                                    onDelete={handlers.handleDelete}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <Toolbar
                onReset={handlers.handleReset}
                onAddText={handlers.handleAddText}
                onAddImage={handlers.handleAddImage}
                onSetBackgroundImage={handlers.handleSetBackgroundImage}
                onExport={handlers.handleExport}
            />

            <ResetModal
                isOpen={showResetModal}
                onConfirm={handlers.handleConfirmReset}
                onCancel={handlers.handleCancelReset}
            />
        </div>
    );
};

export default Canvas;