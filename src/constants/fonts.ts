/**
 * Google Fonts Configuration
 * Popular fonts for canvas editor
 */

export interface FontFamily {
  name: string;
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
  weights: number[];
}

export const GOOGLE_FONTS: FontFamily[] = [
  // Sans-serif
  { name: 'Inter', family: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700, 800, 900] },
  { name: 'Roboto', family: 'Roboto', category: 'sans-serif', weights: [300, 400, 500, 700, 900] },
  { name: 'Open Sans', family: 'Open Sans', category: 'sans-serif', weights: [400, 600, 700, 800] },
  { name: 'Lato', family: 'Lato', category: 'sans-serif', weights: [400, 700, 900] },
  { name: 'Montserrat', family: 'Montserrat', category: 'sans-serif', weights: [400, 500, 600, 700, 800, 900] },
  { name: 'Poppins', family: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700, 800, 900] },
  { name: 'Raleway', family: 'Raleway', category: 'sans-serif', weights: [400, 500, 600, 700, 800, 900] },
  
  // Serif
  { name: 'Playfair Display', family: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900] },
  { name: 'Merriweather', family: 'Merriweather', category: 'serif', weights: [400, 700, 900] },
  { name: 'Lora', family: 'Lora', category: 'serif', weights: [400, 500, 600, 700] },
  { name: 'Crimson Text', family: 'Crimson Text', category: 'serif', weights: [400, 600, 700] },
  
  // Display
  { name: 'Bebas Neue', family: 'Bebas Neue', category: 'display', weights: [400] },
  { name: 'Oswald', family: 'Oswald', category: 'display', weights: [400, 500, 600, 700] },
  { name: 'Anton', family: 'Anton', category: 'display', weights: [400] },
  { name: 'Righteous', family: 'Righteous', category: 'display', weights: [400] },
  
  // Handwriting
  { name: 'Pacifico', family: 'Pacifico', category: 'handwriting', weights: [400] },
  { name: 'Dancing Script', family: 'Dancing Script', category: 'handwriting', weights: [400, 500, 600, 700] },
  { name: 'Caveat', family: 'Caveat', category: 'handwriting', weights: [400, 500, 600, 700] },
  
  // Monospace
  { name: 'Roboto Mono', family: 'Roboto Mono', category: 'monospace', weights: [400, 500, 600, 700] },
  { name: 'Fira Code', family: 'Fira Code', category: 'monospace', weights: [400, 500, 600, 700] },
];

export const DEFAULT_FONT = 'Inter';

/**
 * Generate Google Fonts URL for loading fonts
 */
export const getGoogleFontsUrl = (): string => {
  const families = GOOGLE_FONTS.map(font => {
    const weights = font.weights.join(';');
    return `family=${font.family.replace(/ /g, '+')}:wght@${weights}`;
  }).join('&');
  
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
};

/**
 * Load Google Fonts dynamically
 */
export const loadGoogleFonts = (): void => {
  // Check if already loaded
  const existingLink = document.querySelector('link[data-google-fonts]');
  if (existingLink) return;

  const link = document.createElement('link');
  link.href = getGoogleFontsUrl();
  link.rel = 'stylesheet';
  link.setAttribute('data-google-fonts', 'true');
  document.head.appendChild(link);
};
