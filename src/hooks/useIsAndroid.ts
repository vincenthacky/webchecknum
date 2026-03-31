"use client";

import { useState, useEffect } from "react";

export function useIsAndroid(): boolean | null {
  const [isAndroid, setIsAndroid] = useState<boolean | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsAndroid(/android/i.test(ua));
  }, []);

  return isAndroid;
}
