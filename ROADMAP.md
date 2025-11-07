# 🚀 Canvas Editor - Roadmap Rozwoju Aplikacji

## 📊 Obecny Stan Projektu

### ✅ Zaimplementowane Funkcje
- **Podstawowe elementy**: Tekst i obrazy
- **Manipulacja elementami**: Drag & drop, resize, delete
- **Edycja tekstu**: Zmiana koloru, edycja treści
- **Tło**: Kolor lub obraz
- **Export**: PNG (1080x1350)
- **UI**: Toolbar z podstawowymi narzędziami
- **Stack technologiczny**: React 18, TypeScript, React DnD, html2canvas, Lucide icons

### 🎯 Typ Aplikacji
**Lokalna aplikacja web** - działa offline (serwer lokalny lub Docker), alternatywa dla Canva/Figma bez hostingu

---

## 🗺️ ROADMAP - Fazy Rozwoju

---

## 📦 FAZA 1: Rozszerzenie Podstawowych Funkcji (2-3 tygodnie)

### 1.1 Zaawansowana Edycja Tekstu
- [ ] **Czcionki**: 
  - Integracja z Google Fonts
  - Wybór różnych czcionek
  - Upload własnych czcionek
- [ ] **Formatowanie**:
  - Pogrubienie, kursywa, podkreślenie
  - Wyrównanie tekstu (left, center, right, justify)
  - Odstępy między liniami
  - Wielkość czcionki (slider + input)
- [ ] **Efekty tekstowe**:
  - Cienie
  - Obramowanie
  - Gradient kolorów
  - Przezroczystość (opacity)

### 1.2 Więcej Typów Elementów
- [ ] **Kształty geometryczne**:
  - Prostokąt, koło, trójkąt, gwiazda
  - Linie i strzałki
  - Customowe kształty (paths SVG)
- [ ] **Ikony i symbole**:
  - Biblioteka ikon
  - Kategorie (social media, biznes, etc.)
- [ ] **Ramki i obramowania**:
  - Dekoracyjne ramki
  - Borders dla elementów

### 1.3 Ulepszone Zarządzanie Warstwami
- [ ] **Panel warstw** (Layers):
  - Lista wszystkich elementów
  - Zmiana kolejności (z-index)
  - Pokazywanie/ukrywanie warstw
  - Blokowanie warstw
  - Grupowanie elementów
- [ ] **Operacje na warstwach**:
  - Duplikowanie
  - Wyrównanie (align left, center, right, top, middle, bottom)
  - Dystrybucja (distribute horizontally/vertically)

### 1.4 Historia Zmian (Undo/Redo)
- [ ] Implementacja Command Pattern
- [ ] Ctrl+Z / Ctrl+Y shortcuts
- [ ] Historia ostatnich 50 akcji
- [ ] Wizualizacja historii

---

## 🎨 FAZA 2: Profesjonalne Narzędzia Designerskie (3-4 tygodnie)

### 2.1 Zaawansowane Efekty
- [ ] **Filtry obrazów**:
  - Brightness, contrast, saturation
  - Blur, sharpen
  - Vintage, sepia, black&white
- [ ] **Efekty warstw**:
  - Drop shadow
  - Inner shadow
  - Glow (outer/inner)
  - Gradient overlay
  - Blend modes (multiply, screen, overlay, etc.)

### 2.2 Narzędzia Rysowania
- [ ] **Pędzel/Pencil**:
  - Rysowanie odręczne
  - Różne grubości
  - Kolory
- [ ] **Kształty z kreśleniem**:
  - Prostokąty, koła przez drag
  - Linie i krzywe Béziera
- [ ] **Zaznaczenie i crop**:
  - Zaznaczanie obszaru
  - Przycinanie obrazów

### 2.3 Szablony i Presety
- [ ] **Biblioteka szablonów**:
  - Social media (Instagram post, Story, Facebook cover, etc.)
  - Marketing (flyer, poster, banner)
  - Business (wizytówka, prezentacja)
  - Customowe rozmiary canvas
- [ ] **Zapisane style**:
  - Style tekstów
  - Style kształtów
  - Palety kolorów
  - Quick apply

### 2.4 Zaawansowany Export
- [ ] **Wiele formatów**:
  - PNG (z transparencją)
  - JPG (z jakością)
  - SVG
  - PDF
- [ ] **Opcje eksportu**:
  - Różne rozmiary (1x, 2x, 3x)
  - Batch export
  - Kompresja obrazów
- [ ] **Obszar exportu**:
  - Export całego canvas
  - Export zaznaczonego obszaru

---

## 💾 FAZA 3: Backend i Zarządzanie Projektami (4-5 tygodni) – WARIANT LOKALNY

### 3.1 Lokalna Infrastruktura Backend
- [ ] **Stack**:
  - Node.js + Express + PostgreSQL (docker) – transakcje, JSONB, indeksy
  - Alternatywa: MongoDB lokalny kontener (docker-compose) jeśli preferowany model dokumentowy
- [ ] **API endpoints (lokalne)**:
  - Auth (rejestracja, login, JWT lub prosty session token)
  - CRUD projektów (zapisy w katalogu /data/projects jako JSON + mini indeks w bazie)
  - Upload obrazów: zapis do katalogu /data/assets (nazwa = hash + oryginalne rozszerzenie)
  - Zarządzanie użytkownikami (jeśli multi-user; dla single-user można pominąć auth)

### 3.2 System Autoryzacji (Minimalny)
Uzasadnienie: Środowisko lokalne/single-user nie wymaga zewnętrznych OAuth; prostsze sesje redukują złożoność i brak zależności chmurowych.
- [ ] **Rejestracja i logowanie** (opcjonalne przy single-user):
  - Email + hasło (haszowane bcrypt)
  - Brak zewnętrznych OAuth (offline środowisko)
- [ ] **Sesje użytkownika**:
  - JWT lokalny (bez refresh) LUB pamięć serwera (in-memory store) – prostsze lokalnie
  - Brak potrzeby "Remember me" poza cookies

### 3.3 Zarządzanie Projektami
- [ ] **Zapisywanie projektów**:
  - Auto-save co X sekund (bezpośrednio do pliku JSON)
  - Wersjonowanie: katalog /data/versions/<projectId>/<timestamp>.json
  - Przywracanie poprzez wczytanie wersji
- [ ] **Organizacja**:
  - Foldery w strukturze /data/projects (np. tagi = nazwy podfolderów)
  - Wyszukiwanie: indeksy w PostgreSQL (btree/GIN dla JSONB: name, tags, updatedAt)
  - Sortowanie lokalnie po danych z bazy
- [ ] **Dashboard**:
  - Lista projektów z wygenerowanymi miniaturami (cache w /data/thumbs)
  - Ostatnio edytowane z updatedAt
  - Podgląd statystyk (liczba projektów, zajęta przestrzeń dyskowa)

### 3.4 Local Storage
- [ ] Brak integracji z S3/Cloudinary – wszystko na dysku
- [ ] Katalogi montowane jako wolumeny Dockera (projects, assets, versions, thumbs)
- [ ] Mechanizm czyszczenia starych wersji (retencja np. ostatnie 20)
- [ ] Ręczny backup: eksport ZIP z /data (skrypt pomocniczy)

---

## 👥 FAZA 4: Współpraca i社会功能 (3-4 tygodnie)

### 4.1 Współpraca Real-time
- [ ] **WebSocket/Socket.io**:
  - Live editing (jak Google Docs)
  - Cursory innych użytkowników
  - Real-time synchronizacja
- [ ] **Współdzielenie projektów**:
  - Share link (view/edit permissions)
  - Publiczne/prywatne projekty
  - Komentarze i feedback

### 4.2 Społeczność
- [ ] **Galeria publicznych projektów**:
  - Explore/discover
  - Kategorie
  - Featured designs
- [ ] **Social features**:
  - Liking/favoriting
  - Komentarze
  - Followowanie użytkowników
- [ ] **Portfolio użytkownika**:
  - Profil publiczny
  - Showcasing prac

### 4.3 Współpraca w Zespole
- [ ] **Organizacje/Teams**:
  - Workspace dla firm
  - Role (admin, editor, viewer)
  - Brand kit (logo, kolory, czcionki firmy)
- [ ] **Approval workflow**:
  - Review i zatwierdzanie
  - Wersje robocze vs finalne

---

---

(Usunięto dalsze fazy 5–9 aby skupić się wyłącznie na solidnym fundamencie lokalnym: funkcje edycji, backend lokalny, współpraca podstawowa. Rozszerzenia AI, monetyzacja, integracje i aplikacje mobilne poza aktualnym zakresem.)


## 🎯 PRIORYTETY - Co Robić Najpierw?

### ⭐ MUST-HAVE (Pierwsze 3 miesiące)
1. **Historia zmian (Undo/Redo)** - krytyczne dla UX
2. **Więcej czcionek i formatowanie tekstu** - podstawowa funkcja
3. **Kształty geometryczne** - rozszerzenie możliwości
4. **Panel warstw** - profesjonalne zarządzanie
5. **Backend + Auth + Zapisywanie projektów** - podstawa aplikacji

### 🚀 SHOULD-HAVE (3-6 miesięcy)
6. **Szablony** - szybki start dla użytkowników
7. **Zaawansowane efekty** - wyróżnienie się
8. **Współdzielenie projektów** - viral growth
9. **Mobile responsive** - dostępność

### 💎 NICE-TO-HAVE (6-12 miesięcy)
(Usunięto wcześniejsze pozycje 10–13; fazy po 4 wycięte – pozostawiono koncentrację na wersji lokalnej MVP.)

---

## 🛠️ Rekomendowane Technologie

### Frontend Enhancement
- **State Management**: Redux Toolkit lub Zustand
- **UI Components**: Radix UI, Shadcn/ui
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Color Picker**: react-colorful
- **File Upload**: react-dropzone

### Backend (Wariant Lokalny)
- **Framework**: Express.js (lekki) – NestJS opcjonalnie później
- **Database**: PostgreSQL (docker) – migracje (drizzle/knex), JSONB na snapshoty; alternatywnie MongoDB lokalnie
- **Auth**: Minimalny moduł JWT (bez zewnętrznych providerów) lub brak przy single-user
- **Storage**: System plików + struktura katalogów (/data/projects, /data/assets, /data/versions)
- **Real-time**: Socket.io lokalnie (bez skalowania)

### DevOps / Uruchamianie Lokalnie
- **Uruchomienie**: docker-compose (frontend + backend + opcjonalnie mongo)
- **CI/CD**: GitHub Actions (test + build artefakt docker) – brak deploy automatycznego publicznie
- **Monitoring**: Lokalny log viewer (np. pino-pretty) + opcjonalnie Sentry self-host jeśli konieczne
- **Testing**: Vitest, Playwright (lokalny headless)

---

## 📈 Metryki Sukcesu

### Techniczne
- [ ] Performance Score > 90 (Lighthouse)
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 500KB (initial)
- [ ] 99.9% uptime

### Biznesowe
- [ ] 1,000 aktywnych użytkowników (3 miesiące)
- [ ] 10,000 aktywnych użytkowników (6 miesięcy)
- [ ] 5% conversion free → paid
- [ ] $5,000 MRR (6 miesięcy)

---

## 🎬 Następne Kroki - Od Czego Zacząć?

### Tydzień 1-2: Setup Infrastruktury
1. Setup Redux/Zustand dla state management
2. Implementacja Undo/Redo
3. Dodanie więcej czcionek (Google Fonts)
4. Panel warstw (layers)

### Tydzień 3-4: Rozszerzenie Funkcji
5. Kształty geometryczne
6. Zaawansowane formatowanie tekstu
7. Wyrównanie i dystrybucja elementów
8. Keyboard shortcuts

### Tydzień 5-8: Backend
9. Setup backend (Express + MongoDB)
10. Implementacja auth
11. Zapisywanie projektów
12. Dashboard użytkownika

### Miesiąc 3: MVP Complete
13. Szablony (10-20 sztuk)
14. Responsive design
15. Testing i bug fixing
16. Soft launch

---

## 🎨 Inspiracje i Konkurencja

### Analiza Konkurencji
- **Canva**: Szablony, prosty UI, AI features
- **Figma**: Collaboration, profesjonalne narzędzia
- **Adobe Express**: Integracja z Adobe, stock photos
- **Crello (VistaCreate)**: Animacje, video editing

### Unique Value Proposition
Twoja aplikacja może się wyróżnić przez:
1. **Szybkość i prostotę** - lżejsza niż Canva
2. **Privacy-focused** - dane lokalnie, opcjonalny cloud
3. **Open-source plugins** - community-driven
4. **Niższa cena** - demokratyzacja designu
5. **Niszowy focus** - np. specjalizacja w social media / e-commerce

---

## 📚 Dokumentacja i Zasoby

### Co Warto Dodać
- [ ] User documentation (Help Center)
- [ ] Video tutorials
- [ ] Blog o designie
- [ ] API documentation
- [ ] Developer guides

---

**Ostatnia aktualizacja**: 2025
**Wersja**: 1.1 (lokalne wdrożenie, brak publicznego hostingu)
