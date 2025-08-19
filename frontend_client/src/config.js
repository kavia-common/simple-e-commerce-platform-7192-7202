export const COLORS = {
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#FFC107',
};

export const THEME = {
  light: {
    '--bg': '#ffffff',
    '--bg-alt': '#f7f9fc',
    '--text': '#111827',
    '--muted': '#6b7280',
    '--border': '#e5e7eb',
    '--primary': COLORS.primary,
    '--secondary': COLORS.secondary,
    '--accent': COLORS.accent,
    '--card-bg': '#ffffff',
    '--card-hover': '#f3f4f6',
    '--danger': '#e11d48',
    '--success': '#059669'
  }
};

// PUBLIC_INTERFACE
export function applyTheme(root = document.documentElement, theme = THEME.light) {
  /** Apply CSS variables for the selected theme to the :root */
  Object.entries(theme).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns API base URL read from environment, defaults to /api if not set. */
  // NOTE: Request orchestrator should provide REACT_APP_API_BASE_URL via .env
  return process.env.REACT_APP_API_BASE_URL || '/api';
}
