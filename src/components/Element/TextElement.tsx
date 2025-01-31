import React, { useEffect, useRef } from 'react';
import '../.././styles/TextElement.scss';
import { Trash2, Move } from 'lucide-react';

interface TextElementProps {
    id: string;
    content: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    color: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDeselect: () => void;
    onDragStart: (e: React.MouseEvent, id: string) => void;
    onContentChange: (id: string, content: string) => void;
    onColorChange: (id: string, color: string) => void;
    onResize: (id: string, width: number, height: number) => void;
    onDelete: (id: string) => void;
}

const TextElement: React.FC<TextElementProps> = ({
                                                     id,
                                                     content,
                                                     position,
                                                     size,
                                                     color,
                                                     isSelected,
                                                     onSelect,
                                                     onDeselect,
                                                     onDragStart,
                                                     onContentChange,
                                                     onColorChange,
                                                     onResize,
                                                     onDelete
                                                 }) => {
    const colors = ['#666666', '#FF0000', '#0000FF', '#ffffff', '#00FF00'];
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
            className={`text-element ${isSelected ? 'selected' : ''}`}
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

                    <div className="color-controls">
                        {colors.map((c) => (
                            <button
                                key={c}
                                className={`color-button ${color === c ? 'selected' : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => onColorChange(id, c)}
                            />
                        ))}
                    </div>
                </>
            )}

            <div
                contentEditable
                className={`text-content ${!content ? 'placeholder' : ''}`}
                style={{ color: content ? color : '#999' }}
                onInput={(e) => onContentChange(id, e.currentTarget.textContent || '')}
                suppressContentEditableWarning
            >
                {content || 'Type your text here'}
            </div>
        </div>
    );
};

export default TextElement;