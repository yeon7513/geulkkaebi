export function fullPageScrolling(ref, idx, setIdx) {
  const sections = ref.current.querySelectorAll('section');

  let isScrolling = false;

  const handleScroll = (e) => {
    e.preventDefault();

    if (isScrolling) return;
    isScrolling = true;

    const delta = e.deltaY;
    if (delta > 0 && idx < sections.length - 1) {
      setIdx((prev) => prev + 1);
    } else if (delta < 0 && idx > 0) {
      setIdx((prev) => prev - 1);
    }

    setTimeout(() => (isScrolling = false), 1000);
  };

  window.addEventListener('wheel', handleScroll, { passive: false });
  return () => {
    window.removeEventListener('wheel', handleScroll);
  };
}
