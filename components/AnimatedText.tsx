import React, { useEffect, useRef, useState } from 'react';

function useInViewOnce(margin = '-40px'): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, inView];
}

interface SplitWordRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div';
  delay?: number;
}

/**
 * Kinetic word-by-word text animation triggered on scroll into view.
 * Animates only compositor-friendly transform and opacity.
 */
export const SplitWordReveal: React.FC<SplitWordRevealProps> = ({
  text,
  className = '',
  highlightWords = [],
  highlightClassName = 'text-[#88b03f]',
  as: Tag = 'h2',
  delay = 0,
}) => {
  const [ref, isInView] = useInViewOnce('80px');
  const words = text.split(' ');
  const normalizedHighlights = new Set(highlightWords.map((w) => w.toLowerCase()));

  return (
    <Tag className={className} style={{ textWrap: 'balance' }}>
      <span ref={ref} className="inline">
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9+-]/g, '').toLowerCase();
          const isHighlighted =
            normalizedHighlights.has(cleanWord) ||
            normalizedHighlights.has(word.toLowerCase());
          const wordDelayMs = Math.round((delay + idx * 0.03) * 1000);
          return (
            <React.Fragment key={`${word}-${idx}`}>
              <span
                style={{
                  transitionDelay: `${wordDelayMs}ms`,
                  transitionDuration: '400ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`inline-block transition-[transform,opacity] ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'
                } ${isHighlighted ? highlightClassName : ''}`}
              >
                {word}
              </span>
              {idx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        })}
      </span>
    </Tag>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
}

/**
 * Smooth scroll-triggered section/card reveal using compositor-only properties.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const [ref, isInView] = useInViewOnce('80px');

  const hiddenClass = {
    up: 'opacity-90 translate-y-3',
    left: 'opacity-90 -translate-x-3',
    right: 'opacity-90 translate-x-3',
    scale: 'opacity-90 scale-98',
  }[direction];

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${Math.round(delay * 1000)}ms`,
        transitionDuration: '450ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-[transform,opacity] ${
        isInView
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : hiddenClass
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
}

/**
 * Tabular-numeral animated counter triggered when scrolled into view.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  durationMs = 1000,
}) => {
  const [ref, isInView] = useInViewOnce('-20px');
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [isInView, value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};
