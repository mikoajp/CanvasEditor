# FAZA 1 – Rozszerzenie Podstawowych Funkcji (lokalnie)

Cel: Użyć edytora do realnych zadań – tekst, kształty, panel warstw, stabilne undo/redo. Zgodnie z wariantem lokalnym: brak usług chmurowych, czcionki i zasoby trzymamy lokalnie.

1) Zakres funkcjonalny
- Tekst: lokalne czcionki (pakiet w /public/fonts + @font-face), rozmiar, waga, italic/underline, kolor, wyrównanie, line-height, obrys, cień, przezroczystość.
- Kształty: prostokąt, elipsa/koło, trójkąt, linia, strzałka, gwiazda; wypełnienie, obrys, grubość obrysu.
- Warstwy: lista elementów, zmiana kolejności (zIndex), ukrywanie/pokazywanie, blokowanie, duplikacja, grupowanie (MVP: grupa = wrapper idów).
- Historia: undo/redo do 50 akcji, skróty Ctrl+Z / Ctrl+Y, batching przy drag/resize (commit on mouseup).

2) Architektura i potrzebne zmiany w kodzie
- Stan: Zustand z podziałem na slices: elementsStore, selectionStore, historyStore.
- Command Pattern: AddElementCommand, UpdateElementCommand, RemoveElementCommand, ReorderZIndexCommand.
- Struktura plików:
  - src/features/history/* (HistoryManager, ICommand, hooki undo/redo)
  - src/features/text/* (TextTool, panel formatowania)
  - src/features/shapes/* (factory createShape, ShapeTool, renderery)
  - src/features/layers/* (LayersPanel, akcje hide/lock/duplicate)
  - src/core/* (typy BaseElement, TextElement, ShapeElement; EditorCore)
- Render: komponent Canvas korzysta z modelu i nakłada style/transformacje.
- Czcionki: dodać /public/fonts oraz styles/fonts.css z @font-face; lista whitelisted rodzin (np. Inter, Roboto, Montserrat, Poppins, Lora).

3) Implementacja krok po kroku
- [1] Wprowadź Zustand + typy elementów i selekcji.
- [2] Dodaj HistoryManager i komendy; podłącz do akcji dodawania/edycji/drag/resize.
- [3] Wdróż TextTool + panel formatowania (akcje mapują się na UpdateElementCommand).
- [4] Dodaj ShapeTool + createShape('rect'|'circle'|'triangle'|'line'|'arrow'|'star').
- [5] Zaimplementuj LayersPanel (sort wg zIndex, akcje: move up/down/top/bottom, hide, lock, duplicate).
- [6] Skróty klawiaturowe i blokada redo/undo, gdy stos pusty.

4) Zmiany w UI/UX
- Toolbar: przyciski Text, Shapes, Undo, Redo; panel boczny Format/Layers.
- Widoczny wskaźnik blokady/ukrycia przy elementach warstw.

5) Testy i akceptacja
- Jednostkowe: HistoryManager (do/undo/redo, batchowanie), createShape.
- Integracyjne: dodaj→cofnij→ponów, zmiana zIndex widoczna na canvasie.
- Kryteria: stabilne undo/redo, min. 5 czcionek lokalnie, sprawny panel warstw.

6) Ryzyka i mitigacje
- Rozjeżdżanie wymiarów przy zmianie fontu – recompute tekstu po załadowaniu font-face.
- Wydajność przy dużej liczbie elementów – memoizacja selektorów i throttling podczas drag.
