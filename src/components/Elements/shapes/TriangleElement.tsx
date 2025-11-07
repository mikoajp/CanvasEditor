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

<<<<<<< HEAD
  // Use onDeselect to support deselection when clicking outside (fix TS6133)
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

=======
>>>>>>> e374285 (feat(shapes): dodaj figury (prostokąt, koło, trójkąt) do edytora\n\n- Canvas: renderowanie Rectangle/Circle/Triangle + wsparcie zaznaczania, przeciągania, zmiany rozmiaru i usuwania\n- CanvasHandlers: handleAddRectangle/handleAddCircle/handleAddTriangle z wykorzystaniem shapeFactory\n- Toolbar: sekcja Shapes, przyciski dodawania figur oraz ShapeControls widoczne dla wybranych kształtów\n- LayersPanel: wsparcie dla nowych typów elementów\n- Styles: aktualizacje Toolbar.scss oraz dodane Style dla kształtów (ShapeControls.scss, ShapeElement.scss)\n- Types: rozszerzenie CanvasElement o ShapeElement\n- Constants/Utils: stałe kształtów i fabryka kształtów)
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
