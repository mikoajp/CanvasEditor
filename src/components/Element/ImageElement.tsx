import React, { useEffect, useRef } from 'react';
import '../.././styles/ImageElement.scss';
import { Trash2, Move } from 'lucide-react';

interface ImageElementProps {
    id: string;
    src: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDeselect: () => void;
    onDragStart: (e: React.MouseEvent, id: string) => void;
    onResize: (id: string, width: number, height: number) => void;
    onDelete: (id: string) => void;
}

const ImageElement: React.FC<ImageElementProps> = ({
                                                       id,
                                                       src,
                                                       position,
                                                       size,
                                                       isSelected,
                                                       onSelect,
                                                       onDeselect,
                                                       onDragStart,
                                                       onResize,
                                                       onDelete
                                                   }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                onDeselect();
            }
        };

        if (isSelected) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSelected, onDeselect]);

    const handleResizeStart = (e: React.MouseEvent, corner: string) => {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;

            switch (corner) {
                case 'bottom-right':
                    newWidth = startWidth + dx;
                    newHeight = startHeight + dy;
                    break;
                case 'top-left':
                    newWidth = startWidth - dx;
                    newHeight = startHeight - dy;
                    break;
                case 'top-right':
                    newWidth = startWidth + dx;
                    newHeight = startHeight - dy;
                    break;
            }

            onResize(id, Math.max(100, newWidth), Math.max(40, newHeight));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            ref={elementRef}
            className={`image-element ${isSelected ? 'selected' : ''}`}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
            }}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(id);
            }}
        >
            {/* Zmieniona zawartość na img */}
            <div className="image-content">
                <img
                    src={src}
                    alt="Canvas element"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            {isSelected && (
                <>
                    <div className="element-border">
                        <div
                            className="resize-handle top-left"
                            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
                        />
                        <div
                            className="resize-handle top-right"
                            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
                        />
                        <div
                            className="resize-handle bottom-right"
                            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
                        >
                            +
                        </div>
                    </div>

                    <div className="move-icon" onMouseDown={(e) => onDragStart(e, id)}>
                        <Move />
                    </div>

                    <div className="delete-icon" onClick={() => onDelete(id)}>
                        <Trash2 />
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageElement;