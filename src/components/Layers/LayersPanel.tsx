import React, { useState } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { Eye, EyeOff, Lock, Unlock, Trash2, GripVertical } from 'lucide-react';
import { Element } from '../../types/elements';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../../styles/LayersPanel.scss';

// Sortable Layer Item Component
interface SortableLayerItemProps {
    element: Element;
    isSelected: boolean;
    isHidden: boolean;
    isLocked: boolean;
    onSelect: (id: string) => void;
    onToggleVisibility: (id: string, e: React.MouseEvent) => void;
    onToggleLock: (id: string, e: React.MouseEvent) => void;
    onDelete: (id: string, e: React.MouseEvent) => void;
    getElementLabel: (element: Element) => string;
    getElementIcon: (element: Element) => string;
}

const SortableLayerItem: React.FC<SortableLayerItemProps> = ({
    element,
    isSelected,
    isHidden,
    isLocked,
    onSelect,
    onToggleVisibility,
    onToggleLock,
    onDelete,
    getElementLabel,
    getElementIcon,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: element.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`layer-item ${isSelected ? 'selected' : ''} ${isHidden ? 'hidden' : ''} ${isLocked ? 'locked' : ''}`}
            onClick={() => onSelect(element.id)}
        >
            <div className="layer-drag-handle" {...attributes} {...listeners}>
                <GripVertical size={16} />
            </div>

            <div className="layer-icon">
                {getElementIcon(element)}
            </div>

            <div className="layer-info">
                <span className="layer-name">
                    {getElementLabel(element)}
                </span>
                <span className="layer-type">
                    {element.type}
                </span>
            </div>

            <div className="layer-actions">
                <button
                    className="layer-action-btn"
                    onClick={(e) => onToggleVisibility(element.id, e)}
                    title={isHidden ? 'Show' : 'Hide'}
                >
                    {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                <button
                    className="layer-action-btn"
                    onClick={(e) => onToggleLock(element.id, e)}
                    title={isLocked ? 'Unlock' : 'Lock'}
                >
                    {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                </button>

                <button
                    className="layer-action-btn danger"
                    onClick={(e) => onDelete(element.id, e)}
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

const LayersPanel: React.FC = () => {
    const elements = useCanvasStore((state) => state.elements);
    const selectedElementId = useCanvasStore((state) => state.selectedElementId);
    const selectElement = useCanvasStore((state) => state.selectElement);
    const deleteElement = useCanvasStore((state) => state.deleteElement);
    const setElements = useCanvasStore((state) => state.setElements);

    const [hiddenLayers, setHiddenLayers] = useState<Set<string>>(new Set());
    const [lockedLayers, setLockedLayers] = useState<Set<string>>(new Set());

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const toggleVisibility = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setHiddenLayers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const toggleLock = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setLockedLayers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteElement(id);
    };

    const handleSelect = (id: string) => {
        if (!lockedLayers.has(id)) {
            selectElement(id);
        }
    };

    const getElementLabel = (element: Element): string => {
        if (element.type === 'text') {
            return element.content?.substring(0, 20) || 'Text';
        } else if (element.type === 'image') {
            return 'Image';
        } else if (element.type === 'rectangle') {
            return 'Rectangle';
        } else if (element.type === 'circle') {
            return 'Circle';
        } else if (element.type === 'triangle') {
            return 'Triangle';
        }
        return element.type || 'Element';
    };

    const getElementIcon = (element: Element): string => {
        if (element.type === 'text') return '📝';
        if (element.type === 'image') return '🖼️';
        if (element.type === 'rectangle') return '⬜';
        if (element.type === 'circle') return '⭕';
        if (element.type === 'triangle') return '🔺';
        if (element.type === 'star') return '⭐';
        if (element.type === 'line') return '➖';
        return '📦';
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = elements.findIndex((el) => el.id === active.id);
            const newIndex = elements.findIndex((el) => el.id === over.id);

            const newElements = arrayMove(elements, oldIndex, newIndex);
            setElements(newElements);
        }
    };

    // Reverse to show top elements first
    const reversedElements = [...elements].reverse();
    const elementIds = reversedElements.map((el) => el.id);

    return (
        <div className="layers-panel">
            <div className="layers-header">
                <h3>Layers</h3>
                <span className="layer-count">{elements.length}</span>
            </div>

            <div className="layers-list">
                {reversedElements.length === 0 ? (
                    <div className="empty-state">
                        <p>No layers yet</p>
                        <span>Add text or images to get started</span>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={elementIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {reversedElements.map((element) => {
                                const isSelected = element.id === selectedElementId;
                                const isHidden = hiddenLayers.has(element.id);
                                const isLocked = lockedLayers.has(element.id);

                                return (
                                    <SortableLayerItem
                                        key={element.id}
                                        element={element}
                                        isSelected={isSelected}
                                        isHidden={isHidden}
                                        isLocked={isLocked}
                                        onSelect={handleSelect}
                                        onToggleVisibility={toggleVisibility}
                                        onToggleLock={toggleLock}
                                        onDelete={handleDelete}
                                        getElementLabel={getElementLabel}
                                        getElementIcon={getElementIcon}
                                    />
                                );
                            })}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
};

export default LayersPanel;
