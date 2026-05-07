export function navigateWithTransition(navigate, to) {
  if (typeof document !== 'undefined' && typeof document.startViewTransition === 'function') {
    document.startViewTransition(() => navigate(to));
  } else {
    navigate(to);
  }
}
