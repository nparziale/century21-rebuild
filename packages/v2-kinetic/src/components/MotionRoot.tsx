import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

/** Shared motion config — respects `prefers-reduced-motion: reduce` globally. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
