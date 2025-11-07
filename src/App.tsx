import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect } from 'react';
import Canvas from './components/Canvas/Canvas';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { loadGoogleFonts } from './constants/fonts';

const App = () => {
    // Initialize keyboard shortcuts globally
    useKeyboardShortcuts();
    
    // Load Google Fonts on mount
    useEffect(() => {
        loadGoogleFonts();
    }, []);

    return (
        <div className="app">
            <DndProvider backend={HTML5Backend}>
                <Canvas />
            </DndProvider>
        </div>
    );
};

export default App;