import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { ShapeElement } from '../../types/shapes';
import '../../styles/ShapeControls.scss';

interface ShapeControlsProps {
  element: ShapeElement;
  onUpdate: (id: string, updates: Partial<ShapeElement>) => void;
}

const ShapeControls: React.FC<ShapeControlsProps> = ({ element, onUpdate }) => {
  const [showFillPicker, setShowFillPicker] = React.useState(false);
  const [showStrokePicker, setShowStrokePicker] = React.useState(false);

  const handleFillChange = (color: string) => {
    onUpdate(element.id, { fill: color });
  };

  const handleStrokeChange = (color: string) => {
    onUpdate(element.id, { stroke: color });
  };

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(element.id, { strokeWidth: parseInt(e.target.value) });
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(element.id, { opacity: parseFloat(e.target.value) });
  };

  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (element.type === 'rectangle') {
      onUpdate(element.id, { borderRadius: parseInt(e.target.value) });
    }
  };

  const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(element.id, { rotation: parseInt(e.target.value) });
  };

  return (
    <div className="shape-controls-panel">
      <div className="control-group">
        <label>Fill Color</label>
        <div className="color-picker-wrapper">
          <button
            className="color-swatch"
            style={{ backgroundColor: element.fill }}
            onClick={() => setShowFillPicker(!showFillPicker)}
          />
          {showFillPicker && (
            <div className="color-picker-popover">
              <div
                className="color-picker-backdrop"
                onClick={() => setShowFillPicker(false)}
              />
              <HexColorPicker color={element.fill} onChange={handleFillChange} />
            </div>
          )}
        </div>
      </div>

      <div className="control-group">
        <label>Stroke Color</label>
        <div className="color-picker-wrapper">
          <button
            className="color-swatch"
            style={{ backgroundColor: element.stroke }}
            onClick={() => setShowStrokePicker(!showStrokePicker)}
          />
          {showStrokePicker && (
            <div className="color-picker-popover">
              <div
                className="color-picker-backdrop"
                onClick={() => setShowStrokePicker(false)}
              />
              <HexColorPicker color={element.stroke} onChange={handleStrokeChange} />
            </div>
          )}
        </div>
      </div>

      <div className="control-group">
        <label>Stroke Width: {element.strokeWidth}px</label>
        <input
          type="range"
          min="0"
          max="20"
          value={element.strokeWidth}
          onChange={handleStrokeWidthChange}
          className="slider"
        />
      </div>

      {element.type === 'rectangle' && (
        <div className="control-group">
          <label>Border Radius: {element.borderRadius || 0}px</label>
          <input
            type="range"
            min="0"
            max="100"
            value={element.borderRadius || 0}
            onChange={handleBorderRadiusChange}
            className="slider"
          />
        </div>
      )}

      <div className="control-group">
        <label>Rotation: {element.rotation || 0}°</label>
        <input
          type="range"
          min="0"
          max="360"
          value={element.rotation || 0}
          onChange={handleRotationChange}
          className="slider"
        />
      </div>

      <div className="control-group">
        <label>Opacity: {Math.round((element.opacity || 1) * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={element.opacity || 1}
          onChange={handleOpacityChange}
          className="slider"
        />
      </div>
    </div>
  );
};

export default ShapeControls;
