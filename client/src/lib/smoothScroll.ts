// Detect if device is mobile
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth < 768;
}

// Custom smooth scrolling for better UX (desktop only)
export function smoothScrollTo(targetId: string, offset: number = 80) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.offsetTop - offset;

  // On mobile, use instant native scrolling - no smooth behavior
  if (isMobileDevice()) {
    window.scrollTo(0, targetPosition);
    return;
  }

  // Desktop: use custom smooth scrolling
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = Math.min(Math.abs(distance) * 0.5, 1200); // Max 1.2 seconds
  let start: number | null = null;

  function animation(currentTime: number) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Easing function for natural feel
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const easedProgress = easeInOutCubic(progress);
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// Initialize smooth scrolling for anchor links (desktop only)
export function initSmoothScrolling() {
  // Don't intercept anchor links on mobile - let browser handle naturally
  if (isMobileDevice()) {
    return;
  }

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (link && link.getAttribute('href') !== '#') {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      if (targetId) {
        smoothScrollTo(targetId);
      }
    }
  });
}