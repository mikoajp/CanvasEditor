# 🎨 FAZA 2: Profesjonalne Narzędzia Designerskie

## 🎯 Cel Fazy 2
Przekształcenie edytora w profesjonalne narzędzie z zaawansowanymi efektami wizualnymi, narzędziami rysowania i biblioteką szablonów.

**Czas trwania**: 3-4 tygodnie
**Priorytet**: HIGH

---

## 📋 Zakres Prac

### 1. Zaawansowane Efekty Wizualne
- [ ] Filtry obrazów (brightness, contrast, saturation, blur, sharpen)
- [ ] Efekty warstw (drop shadow, inner shadow, glow, gradient overlay)
- [ ] Blend modes (multiply, screen, overlay, etc.)
- [ ] Panel efektów w Toolbar

### 2. Dodatkowe Kształty (dokończenie Sprint 4 z Fazy 1)
- [ ] Rectangle component
- [ ] Circle component
- [ ] Triangle component
- [ ] Star component
- [ ] Line component
- [ ] Shape properties panel
- [ ] Fill, stroke, opacity, rotation controls

### 3. Narzędzia Rysowania
- [ ] Brush/Pencil tool (podstawowe rysowanie)
- [ ] Eraser tool
- [ ] Line tool
- [ ] Arrow tool
- [ ] Grubość i kolor narzędzi

### 4. Biblioteka Szablonów
- [ ] System szablonów (template engine)
- [ ] Kategorie szablonów (Social Media, Marketing, Business)
- [ ] Instagram post templates (5-10 szablonów)
- [ ] Instagram story templates (5-10 szablonów)
- [ ] Facebook cover templates (3-5 szablonów)
- [ ] LinkedIn post templates (3-5 szablonów)
- [ ] Modal wyboru szablonu
- [ ] Preview szablonów

### 5. Zaawansowany Export
- [ ] Wiele formatów (PNG, JPG, SVG)
- [ ] Opcje jakości i kompresji
- [ ] Różne rozmiary (1x, 2x, 3x)
- [ ] Export zaznaczonego obszaru
- [ ] Batch export (wszystkie elementy jako osobne pliki)

### 6. Color Picker & Gradients
- [ ] Zaawansowany color picker
- [ ] Palety kolorów
- [ ] Gradient tool (linear, radial)
- [ ] Eye dropper (pobierz kolor z obrazu)
- [ ] Historia kolorów

---

## 🗓️ Plan Sprintów

### Sprint 1 (Tydzień 1): Kształty Geometryczne
**Cel**: Dokończenie Sprint 4 z Fazy 1

#### Dzień 1-2: Base Shape System
- [ ] BaseShape component (DRY principle)
- [ ] Shape types definition
- [ ] Shape factory pattern
- [ ] Shape default values

#### Dzień 3-4: Shape Components
- [ ] RectangleElement component
- [ ] CircleElement component
- [ ] TriangleElement component
- [ ] StarElement component (optional)
- [ ] LineElement component

#### Dzień 5-6: Shape Properties
- [ ] ShapeControls component
- [ ] Fill color picker
- [ ] Stroke color & width
- [ ] Border radius (rectangle)
- [ ] Opacity slider
- [ ] Rotation control

#### Dzień 7: Integration & Testing
- [ ] Add shape buttons to Toolbar
- [ ] Shape creation flow
- [ ] Update Canvas rendering
- [ ] Test all shapes

**Deliverables**:
- 5 shape components
- ShapeControls panel
- Toolbar integration

---

### Sprint 2 (Tydzień 2): Efekty Wizualne
**Cel**: Profesjonalne efekty dla elementów

#### Dzień 1-2: Shadow System
- [ ] Shadow types (drop shadow, inner shadow)
- [ ] Shadow controls (offset, blur, spread, color)
- [ ] Multiple shadows support
- [ ] CSS filter generation

#### Dzień 3-4: Blur & Glow
- [ ] Blur effect
- [ ] Glow effect (outer/inner)
- [ ] Backdrop blur
- [ ] Effect preview

#### Dzień 5-6: Image Filters
- [ ] Brightness control
- [ ] Contrast control
- [ ] Saturation control
- [ ] Hue rotation
- [ ] Sepia, grayscale filters
- [ ] Filter presets (vintage, dramatic, etc.)

#### Dzień 7: Effects Panel
- [ ] EffectsPanel component
- [ ] Effects list (add/remove/reorder)
- [ ] Effect on/off toggle
- [ ] Integration z Toolbar

**Deliverables**:
- Shadow system
- 10+ image filters
- EffectsPanel component

---

### Sprint 3 (Tydzień 3): Szablony
**Cel**: Biblioteka gotowych szablonów

#### Dzień 1-2: Template Engine
- [ ] Template type definition
- [ ] Template storage structure
- [ ] Template loader
- [ ] Template preview generator

#### Dzień 3-4: Social Media Templates
- [ ] Instagram Post (1080x1080) - 10 templates
- [ ] Instagram Story (1080x1920) - 10 templates
- [ ] Facebook Cover (820x312) - 5 templates
- [ ] LinkedIn Post (1200x627) - 5 templates

#### Dzień 5-6: Template UI
- [ ] TemplateGallery component
- [ ] Template categories
- [ ] Search & filter
- [ ] Preview modal
- [ ] "Use Template" button

#### Dzień 7: Testing
- [ ] Test all templates
- [ ] Adjust spacing/sizing
- [ ] Polish UI

**Deliverables**:
- 30+ professional templates
- Template gallery UI
- Template system

---

### Sprint 4 (Tydzień 4): Export & Finishing Touches
**Cel**: Profesjonalny export i polish

#### Dzień 1-2: Multi-Format Export
- [ ] PNG export (current + transparency option)
- [ ] JPG export (with quality slider)
- [ ] SVG export (basic)
- [ ] Export options modal

#### Dzień 3-4: Advanced Export
- [ ] Multiple sizes (1x, 2x, 3x)
- [ ] Custom dimensions
- [ ] Export selected area
- [ ] Batch export

#### Dzień 5-6: Color System
- [ ] Advanced color picker (hue, saturation, lightness)
- [ ] Color palettes (Material, Tailwind, Custom)
- [ ] Gradient editor
- [ ] Color history (last 10 colors)

#### Dzień 7: Polish & Testing
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] Documentation

**Deliverables**:
- Multi-format export
- Advanced color picker
- Gradient tool

---

## 🎯 Priorytety

### MUST-HAVE (P0)
1. **Kształty geometryczne** - podstawowa funkcjonalność
2. **Drop shadow** - najczęściej używany efekt
3. **Szablony Instagram** - główny use case
4. **JPG export** - alternatywa dla PNG

### SHOULD-HAVE (P1)
5. Image filters (brightness, contrast)
6. Facebook/LinkedIn templates
7. Multi-size export
8. Advanced color picker

### NICE-TO-HAVE (P2)
9. Blend modes
10. Narzędzia rysowania
11. SVG export
12. Gradient tool

---

## 📐 Dobre Praktyki

### Architecture
- [ ] Extend existing store with shape/effect state
- [ ] Use factory pattern for shapes
- [ ] Separate effect logic from rendering
- [ ] Template JSON schema

### Performance
- [ ] Optimize CSS filters
- [ ] Lazy load templates
- [ ] Debounce effect changes
- [ ] Canvas optimization for many elements

### UX
- [ ] Preview przed apply
- [ ] Smooth transitions
- [ ] Loading states dla templates
- [ ] Tooltips for all new features

---

## 🛠️ Nowe Technologie

### Dependencies to Add
```json
{
  "color": "^4.2.3",                    // Color manipulation
  "canvas2svg": "^1.0.1",               // SVG export
  "file-saver": "^2.0.5",               // File download
  "image-js": "^0.35.0"                 // Image processing (optional)
}
```

### Optional (Advanced)
```json
{
  "fabric": "^5.3.0",                   // Canvas manipulation (if needed)
  "konva": "^9.2.0"                     // Alternative canvas library
}
```

---

## 📁 Nowa Struktura Folderów

```
src/
├── components/
│   ├── Elements/
│   │   ├── shapes/                    # NEW
│   │   │   ├── BaseShape.tsx
│   │   │   ├── RectangleElement.tsx
│   │   │   ├── CircleElement.tsx
│   │   │   ├── TriangleElement.tsx
│   │   │   └── StarElement.tsx
│   │   ├── ShapeControls.tsx          # NEW
│   │   └── EffectsPanel.tsx           # NEW
│   ├── Templates/                     # NEW
│   │   ├── TemplateGallery.tsx
│   │   ├── TemplateCard.tsx
│   │   └── TemplatePreview.tsx
│   └── Export/                        # NEW
│       └── ExportModal.tsx
├── templates/                         # NEW
│   ├── instagram-posts/
│   ├── instagram-stories/
│   ├── facebook-covers/
│   └── linkedin-posts/
├── utils/                             # NEW
│   ├── effects.ts                     // Effect utilities
│   ├── filters.ts                     // Image filters
│   ├── export.ts                      // Export utilities
│   └── colors.ts                      // Color utilities
└── types/
    ├── shapes.ts                      # NEW
    ├── effects.ts                     # NEW
    └── templates.ts                   # NEW
```

---

## 🎨 Template Structure

### Template JSON Format
```typescript
interface Template {
  id: string;
  name: string;
  category: 'instagram-post' | 'instagram-story' | 'facebook-cover' | 'linkedin-post';
  thumbnail: string;
  size: { width: number; height: number };
  elements: Element[];
  background: {
    type: 'color' | 'gradient' | 'image';
    value: string | Gradient | string;
  };
}
```

### Example Template
```json
{
  "id": "instagram-post-1",
  "name": "Modern Gradient",
  "category": "instagram-post",
  "thumbnail": "/templates/thumbnails/ig-post-1.png",
  "size": { "width": 1080, "height": 1080 },
  "background": {
    "type": "gradient",
    "value": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  "elements": [
    {
      "type": "text",
      "content": "Your Title Here",
      "fontSize": 72,
      "fontFamily": "Bebas Neue",
      "fontWeight": 700,
      "color": "#ffffff",
      "position": { "x": 540, "y": 400 },
      "textAlign": "center"
    }
  ]
}
```

---

## 📊 Success Criteria

### Functional
- [ ] Wszystkie 5 kształtów działają
- [ ] Minimum 3 efekty wizualne (shadow, blur, filters)
- [ ] Minimum 20 szablonów
- [ ] Export do PNG, JPG
- [ ] Color picker z paletami

### Technical
- [ ] TypeScript strict mode maintained
- [ ] No performance regression
- [ ] Code coverage > 50%
- [ ] Bundle size < 600KB

### UX
- [ ] Wszystkie nowe funkcje z tooltips
- [ ] Smooth animations
- [ ] Loading states
- [ ] Error handling

---

## 🚀 Quick Start

```bash
# Install new dependencies
npm install color file-saver

# Start development
npm run dev

# Test shapes
# 1. Click Rectangle button
# 2. Adjust fill/stroke
# 3. Test rotation
```

---

## 📝 Notes

### Design Decisions
- **Shapes**: SVG-based dla skalowalności
- **Effects**: CSS filters gdzie możliwe (performance)
- **Templates**: JSON format (easy to add more)
- **Export**: Client-side only (no backend needed yet)

### Known Limitations
- SVG export może być basic (bez wszystkich efektów)
- Blend modes ograniczone do CSS mix-blend-mode
- Templates static (no server-side generation yet)

### Future Considerations
- Animation support (Faza przyszła)
- Video export (Faza przyszła)
- AI-generated templates (Faza przyszła)

---

**Created**: 2024
**Status**: 📋 PLANNED
**Estimated Duration**: 3-4 weeks
**Priority**: HIGH
