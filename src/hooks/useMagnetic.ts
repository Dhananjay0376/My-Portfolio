"use client";

import { useRef } from "react";

/**
 * Disabled magnetic effect as per user feedback.
 * Keeping the hook signature for compatibility but removing the pull logic.
 */
export function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);
  return ref;
}
