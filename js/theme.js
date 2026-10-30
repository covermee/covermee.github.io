// Runs before rendering to prevent a flash of the wrong theme.
(() => {
  try {
    const theme = localStorage.getItem("portfolio-theme");
    if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  } catch (_) { /* System preference still works when storage is unavailable. */ }
})();
