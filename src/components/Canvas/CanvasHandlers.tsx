import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import { CanvasElement, TextElement, ImageElement } from '../../types/elements';
import { Background } from './Canvas';
import React from "react";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface HandlersProps {
    setElements: SetState<CanvasElement[]>;
    setBackground: SetState<Background>;
    setSelectedId: SetState<string | null>;
    setShowResetModal: SetState<boolean>;
    setIsDragging: SetState<boolean>;
    setStartPos: SetState<{ x: number; y: number }>;
    elements: CanvasElement[];
    selectedId: string | null;
    isDragging: boolean;
    startPos: { x: number; y: number };
    background: Background;
    canvasRef: React.RefObject<HTMLDivElement>;
}

export const createHandlers = ({
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
                               }: HandlersProps) => ({
    handleConfirmReset: () => {
        setElements([]);
        setBackground({ type: 'color', value: '#ffffff' });
        setSelectedId(null);
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
            id: uuidv4(),
            type: 'text',
            content: 'Type your text here',
            color: '#666666',
            fontSize: 24,
            position: { x: 100, y: 100 },
            size: { width: 300, height: 80 }
        };
        setElements([...elements, newText]);
        setSelectedId(newText.id);
    },

    handleAddImage: (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const newImage: ImageElement = {
                    id: uuidv4(),
                    type: 'image',
                    src: e.target.result as string,
                    position: { x: 50, y: 50 },
                    size: { width: 300, height: 200 }
                };
                setElements(prev => [...prev, newImage]);
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
                setBackground({
                    type: 'image',
                    value: e.target.result as string
                });
            }
        };
        reader.readAsDataURL(file);
    },

    handleMouseDown: (e: React.MouseEvent, id: string) => {
        if ((e.target as HTMLElement).classList.contains('resize-handle')) return;

        setIsDragging(true);
        setSelectedId(id);
        setStartPos({
            x: e.clientX,
            y: e.clientY
        });
    },

    handleMouseMove: (e: React.MouseEvent) => {
        if (!isDragging || !selectedId) return;

        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;

        setElements(elements.map(el => {
            if (el.id === selectedId) {
                return {
                    ...el,
                    position: {
                        x: el.position.x + dx,
                        y: el.position.y + dy
                    }
                };
            }
            return el;
        }));

        setStartPos({
            x: e.clientX,
            y: e.clientY
        });
    },

    handleMouseUp: () => {
        setIsDragging(false);
    },

    handleContentChange: (id: string, content: string) => {
        setElements(elements.map(el =>
            el.id === id ? { ...el, content } : el
        ));
    },

    handleColorChange: (id: string, color: string) => {
        setElements(elements.map(el =>
            el.id === id ? { ...el, color } : el
        ));
    },

    handleResize: (id: string, width: number, height: number) => {
        setElements(elements.map(el =>
            el.id === id ? { ...el, size: { width, height } } : el
        ));
    },

    handleDelete: (id: string) => {
        setElements(elements.filter(el => el.id !== id));
        if (selectedId === id) {
            setSelectedId(null);
        }
    },

    handleDeselect: () => {
        setSelectedId(null);
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
});