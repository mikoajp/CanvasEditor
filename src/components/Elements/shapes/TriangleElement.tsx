import React, { useState, useRef } from 'react';
import { Trash2, Move } from 'lucide-react';
import { TriangleElement as TriangleType } from '../../../types/shapes';
import '../../../styles/ShapeElement.scss';

interface TriangleElementProps extends TriangleType {
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDeselect: () => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: () => void;
}

const TriangleElement: React.FC<TriangleElementProps> = ({
  id,
  position,
  size,
  fill,
  stroke,
  strokeWidth,
  opacity,
  rotation = 0,
  isSelected,
  onSelect,
  onDeselect,
  onDragStart,
  onResize,
  onDelete,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const dx = e.clientX - resizeStart.x;
    const dy = e.clientY - resizeStart.y;

    const newWidth = Math.max(50, resizeStart.width + dx);
    const newHeight = Math.max(50, resizeStart.height + dy);

    onResize(id, newWidth, newHeight);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, resizeStart]);

  // Calculate triangle points (equilateral triangle pointing up)
  const points = `${size.width / 2},${strokeWidth / 2} ${size.width - strokeWidth / 2},${size.height - strokeWidth / 2} ${strokeWidth / 2},${size.height - strokeWidth / 2}`;

  return (
    <div
      ref={elementRef}
      className={`shape-element triangle-element ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onMouseDown={(e) => {
        if (!e.currentTarget.classList.contains('resize-handle')) {
          onDragStart(e, id);
        }
      }}
    >
      <svg
        width={size.width}
        height={size.height}
        style={{ opacity }}
        className="shape-svg"
      >
        <polygon
          points={points}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>

      {isSelected && (
        <>
          <div className="shape-controls">
            <button
              className="control-button move-button"
              title="Move"
              onMouseDown={(e) => {
                e.stopPropagation();
                onDragStart(e, id);
              }}
            >
              <Move size={16} />
            </button>
            <button
              className="control-button delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div
            className="resize-handle se"
            onMouseDown={handleResizeStart}
            title="Resize"
          />
        </>
      )}
    </div>
  );
};

export default TriangleElement;
