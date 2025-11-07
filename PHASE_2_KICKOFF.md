# 🚀 FAZA 2 - Kickoff!

## 🎯 Start: Sprint 1 - Kształty Geometryczne

**Data rozpoczęcia**: 2024
**Cel**: Dokończenie kształtów z Fazy 1 Sprint 4 + profesjonalne narzędzia

---

## 📋 Co robimy TERAZ (Sprint 1 - Tydzień 1):

### ✅ Dzień 1-2: Base Shape System

#### Zadania:
1. **Typy i interfejsy dla kształtów**
   - [ ] Utworzyć `src/types/shapes.ts`
   - [ ] Zdefiniować ShapeElement interface
   - [ ] Rozszerzyć CanvasElement type

2. **BaseShape component**
   - [ ] Utworzyć `src/components/Elements/shapes/BaseShape.tsx`
   - [ ] Podstawowa logika: select, drag, resize
   - [ ] SVG rendering

3. **Shape Factory**
   - [ ] Utworzyć `src/utils/shapeFactory.ts`
   - [ ] Factory function dla tworzenia kształtów
   - [ ] Default values dla każdego kształtu

---

## 🎨 Plan Działania

### Krok 1: Typy dla Kształtów
Stworzymy nowy interface:
```typescript
interface ShapeElement {
  id: string;
  type: 'rectangle' | 'circle' | 'triangle' | 'star' | 'line';
  position: { x: number; y: number };
  size: { width: number; height: number };
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  rotation?: number;
  borderRadius?: number; // tylko dla rectangle
}
```

### Krok 2: Rectangle Component (pierwszy kształt)
Najprostszy do implementacji:
- SVG `<rect>` element
- Fill, stroke, border-radius
- Resize handles
- Rotation

### Krok 3: Circle Component
- SVG `<circle>` element
- Centrum i promień
- Tylko uniform resize (zachowuje proporcje)

### Krok 4: Triangle Component
- SVG `<polygon>` z 3 punktami
- Dynamiczne przeliczanie punktów
- Custom resize logic

### Krok 5: Toolbar Integration
- Przyciski w toolbar (Rectangle, Circle, Triangle)
- Shape creation flow
- Icons z lucide-react

---

## 🎯 Cel Sprint 1 (Tydzień 1):

Na koniec tygodnia użytkownik powinien móc:
1. ✅ Kliknąć "Rectangle" i stworzyć prostokąt
2. ✅ Kliknąć "Circle" i stworzyć koło
3. ✅ Kliknąć "Triangle" i stworzyć trójkąt
4. ✅ Zmienić kolor wypełnienia (fill)
5. ✅ Zmienić kolor obramowania (stroke)
6. ✅ Zmienić grubość obramowania
7. ✅ Przeciągać i resize każdy kształt
8. ✅ Undo/Redo działa z kształtami
9. ✅ Kształty w layers panel

---

## 🛠️ Co zainstalujemy:

Prawdopodobnie tylko:
```bash
npm install color file-saver
```

Reszta zależności z Fazy 1 wystarczy!

---

## 📁 Pliki do utworzenia (Sprint 1):

### Nowe pliki:
1. `src/types/shapes.ts` - Typy
2. `src/components/Elements/shapes/BaseShape.tsx` - Bazowy komponent
3. `src/components/Elements/shapes/RectangleElement.tsx` - Prostokąt
4. `src/components/Elements/shapes/CircleElement.tsx` - Koło
5. `src/components/Elements/shapes/TriangleElement.tsx` - Trójkąt
6. `src/components/Elements/ShapeControls.tsx` - Panel kontroli
7. `src/utils/shapeFactory.ts` - Factory pattern
8. `src/constants/shapes.ts` - Defaults

### Zmodyfikowane:
1. `src/types/elements.ts` - Dodać ShapeElement do union
2. `src/store/canvasStore.ts` - Obsługa shapes (już działa!)
3. `src/components/Toolbar/Toolbar.tsx` - Przyciski shapes
4. `src/components/Canvas/Canvas.tsx` - Rendering shapes
5. `src/components/Layers/LayersPanel.tsx` - Ikony dla shapes

---

## 🎨 UI Design:

### Toolbar - nowa sekcja "Shapes":
```
┌────────────────────────┐
│ History                │
│ [Undo] [Redo] [Dup]   │
├────────────────────────┤
│ Add Content            │
│ [Text] [Image]         │
├────────────────────────┤
│ Shapes              ← NEW
│ [□] [○] [△] [★]       │
├────────────────────────┤
│ Background             │
│ [Color] [Image]        │
└────────────────────────┘
```

### ShapeControls (gdy shape zaznaczony):
```
┌────────────────────────┐
│ Shape Properties       │
├────────────────────────┤
│ Fill Color             │
│ [Color Picker]         │
├────────────────────────┤
│ Stroke Color           │
│ [Color Picker]         │
├────────────────────────┤
│ Stroke Width: 2px      │
│ [———————○———]          │
├────────────────────────┤
│ Opacity: 100%          │
│ [—————————○]           │
├────────────────────────┤
│ Border Radius: 0       │ (tylko Rectangle)
│ [———○————————]         │
└────────────────────────┘
```

---

## 🚀 Gotowy do startu?

Zacznijmy od utworzenia typów i pierwszego kształtu (Rectangle)!

**Pytanie**: Zaczynamy od Rectangle? To najprostszy kształt i dobry starting point.

---

**Status**: 🚀 READY TO START
**Sprint**: 1/4 (Faza 2)
**Focus**: Kształty Geometryczne
**ETA**: 1 tydzień
