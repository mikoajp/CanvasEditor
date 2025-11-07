import html2canvas from 'html2canvas';
import { TextElement, ImageElement } from '../../types/elements';
import { Background } from './Canvas';
import React from "react";
import { useCanvasStore } from '../../store/canvasStore';
import { DEFAULT_TEXT_ELEMENT, DEFAULT_ELEMENT_POSITION } from '../../constants/defaults';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface HandlersProps {
    setShowResetModal: SetState<boolean>;
    setIsDragging: SetState<boolean>;
    setStartPos: SetState<{ x: number; y: number }>;
    selectedId: string | null;
    isDragging: boolean;
    startPos: { x: number; y: number };
    background: Background;
    canvasRef: React.RefObject<HTMLDivElement>;
}

export const createHandlers = ({
    setShowResetModal,
    setIsDragging,
    setStartPos,
    selectedId,
    isDragging,
    startPos,
    background,
    canvasRef
}: HandlersProps) => {
    // Get store actions
    const addElement = useCanvasStore.getState().addElement;
    const updateElement = useCanvasStore.getState().updateElement;
    const deleteElement = useCanvasStore.getState().deleteElement;
    const clearCanvas = useCanvasStore.getState().clearCanvas;
    const selectElement = useCanvasStore.getState().selectElement;
    const updateCanvasSettings = useCanvasStore.getState().updateCanvasSettings;


    return {
        handleConfirmReset: () => {
            clearCanvas();
            updateCanvasSettings({ backgroundColor: '#ffffff', backgroundImage: null });
            setShowResetModal(false);
        },

        handleCancelReset: () => {
            setShowResetModal(false);
        },

        handleReset: () => {
            setShowResetModal(true);
        },

        handleAddText: () => {
            const newText: TextElement = {
                id: `text-${Date.now()}`,
                type: 'text',
                content: DEFAULT_TEXT_ELEMENT.content,
                color: DEFAULT_TEXT_ELEMENT.color,
                fontSize: DEFAULT_TEXT_ELEMENT.fontSize,
                fontFamily: DEFAULT_TEXT_ELEMENT.fontFamily,
                fontWeight: DEFAULT_TEXT_ELEMENT.fontWeight,
                fontStyle: DEFAULT_TEXT_ELEMENT.fontStyle,
                textDecoration: DEFAULT_TEXT_ELEMENT.textDecoration,
                textAlign: DEFAULT_TEXT_ELEMENT.textAlign,
                lineHeight: DEFAULT_TEXT_ELEMENT.lineHeight,
                opacity: DEFAULT_TEXT_ELEMENT.opacity,
                position: { ...DEFAULT_ELEMENT_POSITION },
                size: { width: 300, height: 80 }
            };
            addElement(newText);
        },

        handleAddImage: (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const newImage: ImageElement = {
                        id: `image-${Date.now()}`,
                        type: 'image',
                        src: e.target.result as string,
                        position: { x: 50, y: 50 },
                        size: { width: 300, height: 200 }
                    };
                    addElement(newImage);
                }
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
            reader.readAsDataURL(file);
        },

        handleSetBackgroundImage: (file: File) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    updateCanvasSettings({
                        backgroundImage: e.target.result as string
                    });
                }
            };
            reader.readAsDataURL(file);
        },

        handleMouseDown: (e: React.MouseEvent, id: string) => {
            if ((e.target as HTMLElement).classList.contains('resize-handle')) return;

            setIsDragging(true);
            selectElement(id);
            setStartPos({
                x: e.clientX,
                y: e.clientY
            });
        },

        handleMouseMove: (e: React.MouseEvent) => {
            if (!isDragging || !selectedId) return;

            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;

            const element = useCanvasStore.getState().elements.find(el => el.id === selectedId);
            if (element) {
                updateElement(selectedId, {
                    position: {
                        x: element.position.x + dx,
                        y: element.position.y + dy
                    }
                });
            }

            setStartPos({
                x: e.clientX,
                y: e.clientY
            });
        },

        handleMouseUp: () => {
            setIsDragging(false);
        },

        handleContentChange: (id: string, content: string) => {
            updateElement(id, { content });
        },

        handleColorChange: (id: string, color: string) => {
            updateElement(id, { color });
        },

        handleResize: (id: string, width: number, height: number) => {
            updateElement(id, { size: { width, height } });
        },

        handleDelete: (id: string) => {
            deleteElement(id);
        },

        handleDeselect: () => {
            selectElement(null);
        },

        handleExport: () => {
            if (canvasRef.current) {
                const canvasElement = canvasRef.current;

                html2canvas(canvasElement, {
                    scale: 2,
                    width: 1080,
                    height: 1350,
                    backgroundColor: background.type === 'color' ? background.value : '#ffffff',
                    useCORS: true
                }).then(canvas => {
                    const resizedCanvas = document.createElement('canvas');
                    resizedCanvas.width = 1080;
                    resizedCanvas.height = 1350;

                    const ctx = resizedCanvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(canvas, 0, 0, 1080, 1350);

                        const link = document.createElement('a');
                        link.download = 'canvas-export.png';
                        link.href = resizedCanvas.toDataURL('image/png');
                        link.click();
                    }
                }).catch(error => {
                    console.error('Export failed:', error);
                    alert('Failed to export image');
                });
            }
        }
    };
};
