# 📦 FAZA 1: Rozszerzenie Podstawowych Funkcji

## 🎯 Cel Fazy
Przekształcenie podstawowego prototypu w solidną aplikację z profesjonalnym state managementem, historią zmian i rozszerzonymi możliwościami edycji.

## 📋 Zakres Prac

### 1. Refactoring Architektury ✅ (W TRAKCIE)
- [x] Analiza obecnego kodu
- [ ] Setup State Management (Zustand)
- [ ] Separacja logiki biznesowej od UI
- [ ] Implementacja Custom Hooks
- [ ] Typowanie TypeScript
- [ ] Struktura folderów

### 2. Historia Zmian (Undo/Redo) 🔴 PRIORYTET
- [ ] Command Pattern implementation
- [ ] History stack management
- [ ] Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- [ ] UI indicators (can undo/redo)

### 3. Panel Warstw (Layers)
- [ ] Layers sidebar component
- [ ] Drag to reorder (z-index)
- [ ] Show/hide layers
- [ ] Lock/unlock layers
- [ ] Layer grouping
- [ ] Rename layers

### 4. Zaawansowana Edycja Tekstu
- [ ] Google Fonts integration
- [ ] Font family selector
- [ ] Font size control (slider + input)
- [ ] Text formatting (bold, italic, underline)
- [ ] Text alignment (left, center, right, justify)
- [ ] Line height control
- [ ] Text opacity
- [ ] Text shadow

### 5. Elementy Geometryczne
- [ ] Rectangle component
- [ ] Circle component
- [ ] Triangle component
- [ ] Line component
- [ ] Star component
- [ ] Shape properties (fill, stroke, opacity)

### 6. Operacje na Elementach
- [ ] Duplicate element
- [ ] Align tools (left, center, right, top, middle, bottom)
- [ ] Distribute (horizontal, vertical)
- [ ] Group/Ungroup elements
- [ ] Send to front/back
- [ ] Keyboard shortcuts (Delete, Ctrl+D, Ctrl+G)

---

## 🏗️ Plan Refactoringu

### Krok 1: State Management Setup
**Technologia**: Zustand (lekki, prosty, TypeScript-friendly)

```typescript
// Struktura store:
- elements: Element[]
- selectedElementId: string | null
- canvasSettings: CanvasSettings
- history: HistoryState
- actions: {
  - addElement()
  - updateElement()
  - deleteElement()
  - selectElement()
  - undo()
  - redo()
}
```

### Krok 2: Nowa Struktura Folderów
```
src/
├── components/
│   ├── Canvas/
│   ├── Toolbar/
│   ├── Layers/          # NOWE
│   ├── Properties/      # NOWE
│   └── Elements/
│       ├── TextElement/
│       ├── ImageElement/
│       ├── RectangleElement/  # NOWE
│       ├── CircleElement/     # NOWE
│       └── ShapeElement/      # NOWE
├── hooks/               # NOWE
│   ├── useCanvas.ts
│   ├── useElements.ts
│   ├── useHistory.ts
│   └── useKeyboard.ts
├── store/              # NOWE
│   ├── canvasStore.ts
│   ├── historyStore.ts
│   └── types.ts
├── utils/              # NOWE
│   ├── commands/
│   ├── geometry.ts
│   └── export.ts
├── constants/          # NOWE
│   ├── shortcuts.ts
│   └── defaults.ts
└── types/
    ├── elements.ts
    └── canvas.ts
```

### Krok 3: Wzorce Projektowe
1. **Command Pattern** - dla undo/redo
2. **Factory Pattern** - tworzenie elementów
3. **Observer Pattern** - Zustand
4. **Composition** - komponenty
5. **Custom Hooks** - reusable logic

---

## 🔧 Szczegółowy Plan Implementacji

### Sprint 1 (Tydzień 1): Fundament
**Dzień 1-2: State Management**
- [ ] Install Zustand
- [ ] Create canvasStore
- [ ] Migrate existing state
- [ ] Update components to use store

**Dzień 3-4: Command Pattern & History**
- [ ] Implement Command interface
- [ ] Create concrete commands (Add, Update, Delete, Move)
- [ ] History manager
- [ ] Undo/Redo functionality

**Dzień 5-7: Testing & Refinement**
- [ ] Test history functionality
- [ ] Keyboard shortcuts
- [ ] UI feedback
- [ ] Bug fixes

### Sprint 2 (Tydzień 2): Panel Warstw
**Dzień 1-3: Layers Panel**
- [ ] Layers sidebar component
- [ ] List all elements
- [ ] Select element from list
- [ ] Reorder layers (drag & drop)

**Dzień 4-5: Layer Operations**
- [ ] Show/hide toggle
- [ ] Lock/unlock
- [ ] Rename layer
- [ ] Delete from layers panel

**Dzień 6-7: Polish & Test**
- [ ] Styling
- [ ] Responsive behavior
- [ ] Testing

### Sprint 3 (Tydzień 3): Zaawansowana Edycja Tekstu
**Dzień 1-2: Google Fonts**
- [ ] Install @fontsource or Web Font Loader
- [ ] Font selector component
- [ ] Load fonts dynamically
- [ ] Apply font to text element

**Dzień 3-4: Text Formatting**
- [ ] Bold, Italic, Underline controls
- [ ] Font size control (slider + input)
- [ ] Text alignment buttons
- [ ] Line height control

**Dzień 5-7: Text Effects**
- [ ] Opacity control
- [ ] Text shadow controls
- [ ] Color picker enhancement
- [ ] Testing & polish

### Sprint 4 (Tydzień 4): Kształty Geometryczne
**Dzień 1-3: Shape Components**
- [ ] BaseShape component (DRY)
- [ ] Rectangle component
- [ ] Circle component
- [ ] Triangle component

**Dzień 4-5: Shape Properties**
- [ ] Fill color
- [ ] Stroke color & width
- [ ] Opacity
- [ ] Border radius (rectangle)

**Dzień 6-7: Toolbar Integration**
- [ ] Add shape buttons to toolbar
- [ ] Shape creation flow
- [ ] Testing

---

## 📐 Dobre Praktyki - Checklist

### Code Quality
- [ ] **TypeScript**: Strict mode, no `any`
- [ ] **ESLint**: Configured and passing
- [ ] **Prettier**: Code formatting
- [ ] **Comments**: JSDoc for complex functions
- [ ] **Naming**: Clear, descriptive names

### Architecture
- [ ] **Separation of Concerns**: Logic vs UI
- [ ] **Single Responsibility**: One purpose per component
- [ ] **DRY**: No code duplication
- [ ] **SOLID Principles**: Especially Open/Closed
- [ ] **Composition over Inheritance**

### Performance
- [ ] **React.memo**: Prevent unnecessary re-renders
- [ ] **useMemo/useCallback**: Expensive calculations
- [ ] **Lazy Loading**: Code splitting
- [ ] **Debouncing**: For frequent updates
- [ ] **Virtual Scrolling**: For large lists

### Testing
- [ ] **Unit Tests**: Critical functions
- [ ] **Component Tests**: React Testing Library
- [ ] **Integration Tests**: User flows
- [ ] **E2E Tests**: Playwright (later)

### Accessibility
- [ ] **Keyboard Navigation**: All features accessible
- [ ] **ARIA Labels**: Screen reader support
- [ ] **Focus Management**: Visible focus states
- [ ] **Color Contrast**: WCAG AA minimum

---

## 🎨 UI/UX Improvements

### Visual Design
- [ ] Consistent spacing system (4px grid)
- [ ] Color palette (design tokens)
- [ ] Typography scale
- [ ] Icon system (Lucide)
- [ ] Dark mode support (future)

### User Experience
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Success feedback (toasts)
- [ ] Keyboard shortcuts help modal
- [ ] Tooltips for all tools

---

## 📦 Dependencies to Add

```json
{
  "zustand": "^4.4.7",           // State management
  "immer": "^10.0.3",            // Immutable state updates
  "react-colorful": "^5.6.1",   // Better color picker
  "@dnd-kit/core": "^6.1.0",     // Modern drag & drop
  "@dnd-kit/sortable": "^8.0.0", // Sortable lists
  "webfontloader": "^1.6.28",    // Google Fonts
  "react-hotkeys-hook": "^4.4.1" // Keyboard shortcuts
}
```

### Dev Dependencies
```json
{
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.1.5",
  "@testing-library/user-event": "^14.5.1",
  "vitest": "^1.0.4",
  "eslint": "^8.55.0",
  "prettier": "^3.1.1"
}
```

---

## 🎯 Success Criteria

### Functional
- [x] State management centralized
- [ ] Undo/Redo works for all operations
- [ ] Layers panel fully functional
- [ ] Can create and edit shapes
- [ ] Text formatting complete
- [ ] All keyboard shortcuts work

### Technical
- [ ] TypeScript strict mode enabled
- [ ] No console errors/warnings
- [ ] ESLint passing (0 errors)
- [ ] Code coverage > 60%
- [ ] Bundle size < 500KB
- [ ] Performance score > 85

### UX
- [ ] Responsive on tablets
- [ ] Keyboard accessible
- [ ] Clear visual feedback
- [ ] No UI lag on interactions
- [ ] Intuitive workflows

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install zustand immer react-colorful @dnd-kit/core @dnd-kit/sortable webfontloader react-hotkeys-hook

# Dev dependencies
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Run dev server
npm run dev

# Run tests
npm test

# Lint
npm run lint

# Format
npm run format
```

---

## 📝 Notes

### Design Decisions
- **Zustand over Redux**: Lighter, less boilerplate, easier to learn
- **@dnd-kit over react-dnd**: Better TypeScript support, more modern
- **Command Pattern**: Essential for undo/redo, extensible for future features
- **Composition**: Easier testing, more flexible than inheritance

### Known Limitations
- Canvas performance with 100+ elements (to optimize in Phase 7)
- No mobile touch support yet (Phase 7)
- Single canvas only (multi-page in future)

### Future Considerations
- Plugin system architecture
- Real-time collaboration preparation
- API design for backend integration

---

**Created**: 2024
**Status**: IN PROGRESS 🚧
**Next Review**: After Sprint 1
