export function setTheme(theme: 'light' | 'dark' | 'system') {
  if (theme === 'system') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark);

  document.documentElement.classList.toggle('dark', shouldUseDark);
}
