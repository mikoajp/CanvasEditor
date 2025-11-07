import React, { useState, useRef } from 'react';
import { Trash2, Move } from 'lucide-react';
import { CircleElement as CircleType } from '../../../types/shapes';
import '../../../styles/ShapeElement.scss';

interface CircleElementProps extends CircleType {
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDeselect: () => void;
  onDragStart: (e: React.MouseEvent, id: string) => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: () => void;
}

const CircleElement: React.FC<CircleElementProps> = ({
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

  // Use onDeselect to support outside click deselection (fix TS6133)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const canvasEl = document.querySelector('.canvas');
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node) &&
        canvasEl &&
        canvasEl.contains(event.target as Node)
      ) {
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

    // For circle, maintain aspect ratio (use larger delta)
    const delta = Math.max(Math.abs(dx), Math.abs(dy)) * (dx + dy > 0 ? 1 : -1);
    const newSize = Math.max(50, resizeStart.width + delta);

    onResize(id, newSize, newSize);
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

  const radius = Math.min(size.width, size.height) / 2;

  return (
    <div
      ref={elementRef}
      className={`shape-element circle-element ${isSelected ? 'selected' : ''}`}
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
        <circle
          cx={size.width / 2}
          cy={size.height / 2}
          r={radius - strokeWidth / 2}
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
            title="Resize (maintains aspect ratio)"
          />
        </>
      )}
    </div>
  );
};

export default CircleElement;
