import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { GOOGLE_FONTS } from '../../constants/fonts';
import '../../styles/TextControls.scss';

interface TextControlsProps {
    elementId: string;
    fontFamily?: string;
    fontSize: number;
    fontWeight?: number | 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
    textDecoration?: 'none' | 'underline' | 'line-through';
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    lineHeight?: number;
    opacity?: number;
    color: string;
    onUpdate: (id: string, updates: any) => void;
}

const TextControls: React.FC<TextControlsProps> = ({
    elementId,
    fontFamily = 'Inter',
    fontSize,
    fontWeight = 400,
    fontStyle = 'normal',
    textDecoration = 'none',
    textAlign = 'left',
    lineHeight = 1.4,
    opacity = 1,

    onUpdate,
}) => {
    const isBold = fontWeight === 'bold' || (typeof fontWeight === 'number' && fontWeight >= 600);
    const isItalic = fontStyle === 'italic';
    const isUnderline = textDecoration === 'underline';

    const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate(elementId, { fontFamily: e.target.value });
    };

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(elementId, { fontSize: parseInt(e.target.value) });
    };

    const toggleBold = () => {
        const newWeight = isBold ? 400 : 700;
        onUpdate(elementId, { fontWeight: newWeight });
    };

    const toggleItalic = () => {
        onUpdate(elementId, { fontStyle: isItalic ? 'normal' : 'italic' });
    };

    const toggleUnderline = () => {
        onUpdate(elementId, { textDecoration: isUnderline ? 'none' : 'underline' });
    };

    const handleAlignChange = (align: 'left' | 'center' | 'right' | 'justify') => {
        onUpdate(elementId, { textAlign: align });
    };

    const handleLineHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(elementId, { lineHeight: parseFloat(e.target.value) });
    };

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(elementId, { opacity: parseFloat(e.target.value) });
    };

    return (
        <div className="text-controls">
            {/* Font Family */}
            <div className="control-group">
                <label>Font Family</label>
                <select value={fontFamily} onChange={handleFontFamilyChange} className="font-select">
                    {GOOGLE_FONTS.map((font) => (
                        <option key={font.family} value={font.family} style={{ fontFamily: font.family }}>
                            {font.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Font Size */}
            <div className="control-group">
                <label>Font Size: {fontSize}px</label>
                <input
                    type="range"
                    min="8"
                    max="120"
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="slider"
                />
            </div>

            {/* Text Style Buttons */}
            <div className="control-group">
                <label>Text Style</label>
                <div className="button-group">
                    <button
                        className={`style-btn ${isBold ? 'active' : ''}`}
                        onClick={toggleBold}
                        title="Bold"
                    >
                        <Bold size={18} />
                    </button>
                    <button
                        className={`style-btn ${isItalic ? 'active' : ''}`}
                        onClick={toggleItalic}
                        title="Italic"
                    >
                        <Italic size={18} />
                    </button>
                    <button
                        className={`style-btn ${isUnderline ? 'active' : ''}`}
                        onClick={toggleUnderline}
                        title="Underline"
                    >
                        <Underline size={18} />
                    </button>
                </div>
            </div>

            {/* Text Alignment */}
            <div className="control-group">
                <label>Alignment</label>
                <div className="button-group">
                    <button
                        className={`style-btn ${textAlign === 'left' ? 'active' : ''}`}
                        onClick={() => handleAlignChange('left')}
                        title="Align Left"
                    >
                        <AlignLeft size={18} />
                    </button>
                    <button
                        className={`style-btn ${textAlign === 'center' ? 'active' : ''}`}
                        onClick={() => handleAlignChange('center')}
                        title="Align Center"
                    >
                        <AlignCenter size={18} />
                    </button>
                    <button
                        className={`style-btn ${textAlign === 'right' ? 'active' : ''}`}
                        onClick={() => handleAlignChange('right')}
                        title="Align Right"
                    >
                        <AlignRight size={18} />
                    </button>
                    <button
                        className={`style-btn ${textAlign === 'justify' ? 'active' : ''}`}
                        onClick={() => handleAlignChange('justify')}
                        title="Justify"
                    >
                        <AlignJustify size={18} />
                    </button>
                </div>
            </div>

            {/* Line Height */}
            <div className="control-group">
                <label>Line Height: {lineHeight?.toFixed(1) || '1.4'}</label>
                <input
                    type="range"
                    min="0.8"
                    max="3"
                    step="0.1"
                    value={lineHeight || 1.4}
                    onChange={handleLineHeightChange}
                    className="slider"
                />
            </div>

            {/* Opacity */}
            <div className="control-group">
                <label>Opacity: {Math.round((opacity || 1) * 100)}%</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={opacity || 1}
                    onChange={handleOpacityChange}
                    className="slider"
                />
            </div>
        </div>
    );
};

export default TextControls;
