import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from './components/Canvas/Canvas';

const App = () => {
    return (
        <div className="app">
            <DndProvider backend={HTML5Backend}>
                <Canvas />
            </DndProvider>
        </div>
    );
};

export default App;