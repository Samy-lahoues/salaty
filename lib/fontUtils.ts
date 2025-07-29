/**
 * Font utility types and constants for the prayer times application
 */

export type FontClass =
  | 'font-sans'
  | 'font-arabic'
  | 'font-english'
  | 'font-mono'
  | 'arabic-text'
  | 'english-text';

export const FONT_CLASSES = {
  SANS: 'font-sans' as const,
  ARABIC: 'font-arabic' as const,
  ENGLISH: 'font-english' as const,
  MONO: 'font-mono' as const,
  ARABIC_TEXT: 'arabic-text' as const,
  ENGLISH_TEXT: 'english-text' as const,
} as const;

/**
 * Get the appropriate font class based on content type and interface language
 */
export const getFontClass = (
  contentType: 'arabic' | 'english' | 'mixed' | 'code',
  isRTL: boolean = false
): FontClass => {
  switch (contentType) {
    case 'arabic':
      return FONT_CLASSES.ARABIC_TEXT;
    case 'english':
      return FONT_CLASSES.ENGLISH_TEXT;
    case 'code':
      return FONT_CLASSES.MONO;
    case 'mixed':
    default:
      // For mixed content, use appropriate base font depending on interface language
      return isRTL ? FONT_CLASSES.ENGLISH : FONT_CLASSES.SANS;
  }
};

/**
 * Utility function to combine font classes with other CSS classes
 */
export const withFontClass = (
  fontClass: FontClass,
  additionalClasses: string = ''
): string => {
  return `${fontClass} ${additionalClasses}`.trim();
};

/**
 * Check if text contains Arabic characters
 */
export const containsArabic = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicRegex.test(text);
};

/**
 * Auto-detect the appropriate font class based on text content
 */
export const autoDetectFontClass = (
  text: string,
  isRTL: boolean = false
): FontClass => {
  if (containsArabic(text)) {
    return FONT_CLASSES.ARABIC_TEXT;
  }
  return isRTL ? FONT_CLASSES.ENGLISH_TEXT : FONT_CLASSES.SANS;
};
