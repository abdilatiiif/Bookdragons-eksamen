/**
 * Reusable Tailwind CSS class patterns to reduce repetition
 */

// Cards and containers
export const CARD_STYLES = {
  base: 'rounded-lg shadow-lg p-4',
  elevated: 'rounded-lg shadow-lg p-6',
  elevated2xl: 'rounded-lg shadow-xl p-8',
  errorBox: 'mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg',
  warningBox: 'mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg',
  successBox: 'mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg',
}

// Text and typography
export const TEXT_STYLES = {
  heading1: 'text-4xl font-bold',
  heading2: 'text-3xl font-bold',
  heading3: 'text-2xl font-bold',
  heading4: 'text-xl font-bold',
  heading5: 'text-lg font-bold',
  subtext: 'text-sm text-gray-600',
  subtextMuted: 'text-sm text-gray-500',
  label: 'block text-sm font-semibold text-gray-700 mb-2',
}

// Forms and inputs
export const FORM_STYLES = {
  input:
    'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  select:
    'w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  button: 'px-6 py-2 rounded-lg font-semibold transition',
  buttonPrimary:
    'px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold transition hover:bg-blue-700',
  buttonSecondary:
    'px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold transition hover:bg-gray-300',
  buttonDanger:
    'px-6 py-2 bg-red-600 text-white rounded-lg font-semibold transition hover:bg-red-700',
}

// Spacing utilities
export const SPACING = {
  sectionMargin: 'mb-6',
  sectionMarginLarge: 'mb-8',
  itemSpacing: 'mb-4',
  itemSpacingSmall: 'mb-2',
  itemSpacingLarge: 'mb-6',
}

// Grid and layout
export const LAYOUT = {
  container: 'max-w-7xl mx-auto px-4',
  containerWide: 'w-full px-4',
  gridCard: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  gridCardLarge: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  flex: 'flex items-center justify-between',
  flexCenter: 'flex items-center justify-center',
}

// Status colors
export const STATUS_COLORS = {
  behandles: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  klar_til_henting: 'bg-blue-100 text-blue-800 border border-blue-300',
  hentet: 'bg-green-100 text-green-800 border border-green-300',
  kansellert: 'bg-red-100 text-red-800 border border-red-300',
}
