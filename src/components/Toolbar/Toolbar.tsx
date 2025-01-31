import React, { ChangeEvent } from 'react';
import { Type, Image as ImageIcon, RotateCcw } from 'lucide-react';
import '../.././styles/Toolbar.scss';

interface ToolbarProps {
    onAddText: () => void;
    onAddImage: (file: File) => void;
    onSetBackgroundImage: (file: File) => void;
    onExport: () => void;
    onReset: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
                                             onAddText,
                                             onAddImage,
                                             onSetBackgroundImage,
                                             onExport,
                                             onReset
                                         }) => {
    const handleBackgroundImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onSetBackgroundImage(file);
    };

    const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onAddImage(file);
    };

    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <span className="logo">CanvasEditor</span>
                <button className="reset-button" onClick={onReset}>
                    Reset <RotateCcw size={16} />
                </button>
            </div>

            <div className="add-content-section">
                <div className="section-header">
                    <h3>Add content</h3>
                </div>

                <div className="tools-grid">
                    <button onClick={onAddText} className="tool-item">
                        <Type size={20} />
                        <span>Text</span>
                    </button>

                    <label className="tool-item">
                        <ImageIcon size={20} />
                        <span>Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageAdd}
                            hidden
                        />
                    </label>

                    <label className="tool-item">
                        <ImageIcon size={20} />
                        <span>Background</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundImage}
                            hidden
                        />
                    </label>
                </div>
            </div>

            <button className="export-button" onClick={onExport}>
                Export to PNG
            </button>
        </div>
    );
};

export default Toolbar;