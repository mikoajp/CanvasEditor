# 📘 Canvas Editor – Dokumentacja Realizacji Faz

Opracowanie praktycznych kroków wdrożenia dla każdej fazy roadmapy. Skupienie na minimalnych przyrostach, testowalności i skalowalności. Wszystkie etapy powinny kończyć się działającym inkrementem MVP.

---
## Ogólne Założenia Techniczne
- Język: TypeScript (strict)
- Architektura frontendu: Modularne feature slices (np. /src/features/text, /src/features/shapes)
- Zarządzanie stanem: Zustand (lekkość) – w przyszłości możliwość migracji do Redux Toolkit jeśli potrzebne middleware / devtools.
- Warstwa Canvas: Abstrakcja `EditorCore` + model elementów + kolejka komend (undo/redo)
- Konwencja nazewnicza: PascalCase dla komponentów, camelCase dla modeli, UPPER_SNAKE_CASE dla stałych.
- Testy: Jednostkowe (Vitest), integracyjne wybrane krytyczne interakcje (Playwright po MVP).

---
## Model Bazowy Elementu (draft – Faza 1)
```ts
interface BaseElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'group' | 'drawing';
  x: number; y: number; width: number; height: number; rotation: number;
  opacity: number; locked?: boolean; hidden?: boolean; zIndex: number;
}
interface TextElement extends BaseElement {
  type: 'text';
  text: string; fontFamily: string; fontSize: number; fontWeight?: number;
  italic?: boolean; underline?: boolean; lineHeight?: number; align: 'left'|'center'|'right'|'justify';
  fill: string; stroke?: string; strokeWidth?: number; shadow?: ShadowSpec; gradient?: GradientSpec;
}
interface ShapeElement extends BaseElement {
  type: 'shape'; shape: 'rect' | 'circle' | 'triangle' | 'star' | 'line' | 'arrow' | 'path';
  fill: string; stroke?: string; strokeWidth?: number; shadow?: ShadowSpec; pathData?: string;
}
```
(Modele rozszerzane iteracyjnie – NIE dodawać pól przed wymaganiem.)

---
## Wzorzec Undo/Redo (Faza 1.4)
- Command Pattern: `ICommand { do(state); undo(state); }`
- Stosy: `undoStack: ICommand[]`, `redoStack: ICommand[]`
- Agregacja komend (batch) przy drag/resize (commit po mouseup)
- Limit: 50 – przy przekroczeniu usuwamy najstarszą.

---
## Faza 1 – Rozszerzenie Podstawowych Funkcji (2–3 tyg.)
Cel: Podnieść użyteczność edytora do poziomu „podstawowego narzędzia designu”.
Zakres: Tekst (czcionki, formatowanie), kształty, panel warstw, undo/redo.
Architektura: Wydzielenie `EditorState` + `HistoryManager` + moduł `LayersPanel`.
Kroki Implementacji:
1. Wprowadzić Zustand store: slices: elementsStore, selectionStore, historyStore.
2. Dodać Command Pattern (addElement, updateElement, removeElement, reorderZIndex).
3. Integracja Google Fonts: dynamiczny `<link>` + whitelist (np. Roboto, Poppins, Inter, Montserrat) – później lazily.
4. UI wyboru fontów + widok listy – pamiętać o fallbackach.
5. Formatowanie tekstu: rozszerzyć TextElement + toolbar actions mapujące na updateElementCommand.
6. Dodanie typów kształtów: factory `createShape(shapeType)`.
7. Panel warstw: komponent z listą posortowaną po zIndex; akcje: up/down, hide/show, lock/unlock.
8. Undo/Redo: keyboard shortcuts + dezaktywacja przy braku zawartości w stosie.
Testy Krytyczne:
- Dodanie/edycja elementu → cofnięcie → ponowne wykonanie.
- Zmiana czcionki zachowuje wymiary (lub wymusza recompute width/height).
- Zmiana zIndex odzwierciedlona w renderze.
Kryteria Ukończenia:
- Stabilne undo/redo dla podstawowych akcji.
- Min. 5 czcionek dostępnych.
- Panel warstw umożliwia reorder i hide.

## Faza 2 – Profesjonalne Narzędzia (3–4 tyg.)
Cel: Rozszerzyć możliwości projektowe (efekty, rysowanie, szablony, eksporty).
Architektura: Oddzielny moduł `effectsEngine` – proste filtry CSS + Canvas fallback; `templatesRegistry`.
Kroki:
1. Abstrakcja efektów: `applyEffects(element)` generuje style/filters.
2. Filtry obrazów – na start CSS filter; później offscreen canvas dla zaawansowanych.
3. Warstwowe efekty (shadow, glow) – zdefiniować w modelu obiektu.
4. Narzędzia rysowania: dedykowany tryb; zapis stroke jako path (SVG pathData).
5. Szablony: JSON definicja układu (lista elementów) + loader.
6. Export rozszerzony: PNG/JPG/SVG – PDF jako konwersja SVG → pdf-lib (później).
7. Batch export: pętla po canvasach w pamięci (opcjonalnie queue).
Testy:
- Template import poprawnie tworzy elementy.
- Export SVG zgodny z pozycją i wymiarami.
Kryteria:
- Min. 10 szablonów.
- Działające filtry (brightness/contrast). 

## Faza 3 – Backend i Projekty (4–5 tyg.)
Cel: Persistencja i konta użytkowników.
Stack: Express + MongoDB (Mongoose) lub Supabase (skrócenie czasu – jeśli priorytet szybkości).
Modele:
- User { id, email, passwordHash, createdAt }
- Project { id, ownerId, name, elements[], version, updatedAt }
- ProjectVersion { projectId, version, snapshot, createdAt }
Endpointy (v1):
- POST /auth/register, POST /auth/login
- GET/POST/PUT/DELETE /projects
- POST /projects/:id/version
- GET /projects/:id
Flow Zapisu:
1. Front trzyma local dirty flag.
2. Auto-save co 30s jeśli dirty.
3. Diff optional (MVP – pełny snapshot JSON).
Bezpieczeństwo:
- JWT (access 15m, refresh 7d).
- Rate limiting (login/register). 
Testy:
- Rejestracja i logowanie (hash sprawdzony, brak plain).
- Zapis i odczyt projektu z listą elementów.
Kryteria:
- Użytkownik może zalogować się i zapisać min. 3 projekty.

## Faza 4 – Współpraca i Społeczność (3–4 tyg.)
Cel: Podstawowe współdzielenie + komentarze.
Architektura Real-time: Socket.io kanał per projectId; serwer utrzymuje authoritative state (opcjonalne – start z broadcast diff).
Kroki:
1. Uprawnienia (view/edit) – pole `sharedWith[]` w Project.
2. Socket eventy: join_project, element_updated, element_added, cursor_move.
3. Komentarze: model Comment { id, projectId, authorId, text, createdAt }.
4. Public gallery: GET /projects/public (fields ograniczone).
Testy:
- Dwóch użytkowników aktualizuje ten sam element – ostatni wygrywa (MVP). 
Kryteria:
- Live aktualizacja pozycji elementu widoczna u drugiego użytkownika (<500ms).

## Faza 5 – AI i Automatyzacja (4–6 tyg.)
Cel: Dodanie funkcji wyróżniających.
Strategia: Outsourcing (API) → potem ewentualny własny pipeline.
Kroki:
1. Background removal: integracja z zewnętrznym API; kolejka z loading overlay.
2. AI image generation: prompt modal → request → element image auto-insert.
3. Smart resize: mapowanie template constraints + heurystyka reposition.
4. Magic tools: align suggestions – analiza bounding boxes.
Testy:
- Generowany obraz poprawnie trafia do projektu.
Kryteria:
- Min. 50% żądań tła <3s (monitoring).

## Faza 6 – Monetyzacja i Skalowanie (ongoing)
Cel: Przychody (subskrypcje, marketplace).
Kroki:
1. Stripe: produkty (FREE, PRO, TEAM) – webhook `invoice.paid`.
2. Limit zasobów po roli: MAX_PROJECTS, STORAGE_LIMIT.
3. Marketplace: model Asset { id, type, price, ownerId }.
Kryteria:
- Opłacona subskrypcja zmienia dostęp do PRO feature (np. export PDF).

## Faza 7 – Performance i Optymalizacja (ongoing)
Cel: Utrzymać płynność przy rosnącej złożoności.
Kroki:
1. Code splitting: lazy load paneli (FontsPanel, EffectsPanel).
2. Canvas optymalizacja: requestAnimationFrame + selektywne re-render elementów przy zmianie.
3. Memoization selectorów Zustand.
4. WebGL eksperymentalnie dla efektów (opcjonalnie po stabilizacji).
Metryki: FPS > 50 przy 200 elementach.

## Faza 8 – Integracje i Ekosystem (3–4 tyg.)
Cel: Poszerzenie zastosowań.
Kroki:
1. Social share: backend short link + open graph meta.
2. Cloud import (Google Drive): OAuth, pobranie pliku → element image.
3. Public REST API: ograniczyć do read-only na start.
Kryteria:
- Użytkownik opublikuje projekt linkiem.

## Faza 9 – Aplikacje Mobile/Desktop (6–8 tyg.)
Cel: Wieloplatformowość.
Strategia:
1. Re-użycie logiki: wydzielenie `core` do pakietu (np. /packages/editor-core).
2. React Native: Canvas – Skia / SVG fallback.
3. Synchronizacja: pull on open + delta sync (later real-time).
Kryteria:
- Mobile może otworzyć i edytować prosty projekt (tekst+kształty).

---
## Test Strategy (przekrojowo)
- Jednostkowe: komendy undo/redo, parser templates.
- Integracyjne: zapis projektu, kolaboracja (2 sesje), AI background removal.
- E2E (po MVP): scenariusz tworzenia projektu → zapis → eksport.

## CI/CD
- GitHub Actions: lint + test + build.
- Preview deployments (Vercel) z oznaczaniem commit SHA.
- Feature branches → PR review checklist (testy + typy + brak regresji undo).

## Security & Privacy
- Hasła: bcrypt (cost 12).
- Brak przechowywania surowych obrazów użytkownika poza storage (S3) – linki podpisane.
- Rate limit: 100 req / 15m / IP dla /auth.

## Logging & Monitoring
- Front: Sentry (error boundaries w krytycznych panelach).
- Backend: Winston + pino (JSON logs) + alert na 5xx >1%.

## Migracje Danych (jeśli MongoDB)
- Folder /migrations – skrypty wersjonowane (timestamp_nazwa.js).
- Wersja schematu w kolekcji `system`.

## Kolejność Implementacji (skrót):
1. Store + modele + undo/redo.
2. Tekst + czcionki.
3. Kształty.
4. Panel warstw.
5. Efekty podstawowe.
6. Szablony + eksport rozszerzony.
7. Backend (auth + projekty).
8. Sharing + komentarze.
9. AI (outsourced API).
10. Monetyzacja.

---
## Kryteria Akceptacji MVP (koniec Miesiąca 3)
- Użytkownik: tworzy projekt, dodaje tekst + kształty, zapisuje, ładuje ponownie, eksportuje PNG/JPG.
- Undo/redo działa dla 90% typowych akcji.
- Minimum 10 szablonów.
- Responsywny UI (desktop + tablet). 

## Risk List & Mitigacje
1. Złożoność historii – Mitigacja: limit + agregacja.
2. Wydajność przy wielu elementach – Mitigacja: selektywny render.
3. Vendor lock-in (AI API) – Mitigacja: warstwa abstrakcji `AiProvider`.
4. Race conditions real-time – Mitigacja: serwerowy timestamp + ostatni wygrywa (MVP).

---
Ostatnia aktualizacja: 2025-11-07
Wersja dokumentu: 1.0.0
