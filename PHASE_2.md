# FAZA 2 – Profesjonalne Narzędzia (lokalnie)

Cel: Poszerzyć możliwości projektowe bez chmury. Wszystkie zasoby szablonów i eksporty generowane lokalnie.

1) Zakres funkcjonalny
- Efekty: filtry (brightness, contrast, saturation, blur) – CSS filter; cienie/glow/gradient overlay jako style.
- Rysowanie: tryb Pencil/Brush – zapis ścieżek jako SVG pathData; grubość i kolor.
- Szablony: katalog JSON w /public/templates, predefiniowane układy (social, marketing, business).
- Export: PNG/JPG (html2canvas), SVG (generacja z modelu), PDF (pdf-lib z wygenerowanego SVG/bitmapy) – wszystko offline.

2) Architektura i zmiany
- effectsEngine: applyEffects(element) zwraca style/filters; rozszerzenie modelu o efekty (shadow, glow, gradient).
- drawing: moduł do rejestrowania punktów i zamiany na pathData; element typu 'drawing'.
- templatesRegistry: loader JSON → lista elementów; walidacja schematu.
- export: adaptery exportPng/exportJpg/exportSvg/exportPdf; panel opcji (rozmiar, jakość, tło, obszar).

3) Implementacja krok po kroku
- [1] Dodać pola efektów do modeli + renderer stylów.
- [2] Tryb rysowania (mousedown→mousemove→mouseup) + wygładzanie ścieżek.
- [3] Struktura szablonów: templates/<slug>.json; importer z podglądem miniatury.
- [4] Eksport SVG + PDF (podstawowy); następnie JPG/PNG z opcjami jakości/rozmiaru.

4) Zmiany w UI/UX
- Panel Efektów: filtry, cienie, glow; preset zapisu stylu.
- Panel Szablonów: lista z miniaturami z /public/templates/thumbs.
- Dialog Eksportu: wybór formatu, rozdzielczości, tła, obszaru (całość/zaznaczenie).

5) Testy i akceptacja
- Jednostkowe: parser szablonów, przeliczanie stylów efektów.
- Integracyjne: import szablonu → render zgodny z pozycjami; eksport SVG/PDF.
- Kryteria: min. 10 szablonów, działające filtry i eksporty.

6) Ryzyka
- Różnice renderowania SVG/HTML – snapshot testy i manual QA; ujednolicenie stylów.
