import { useState, useRef, useEffect } from "react";

export const useCutContent = (maxHeight: number) => {
  const [shouldCut, setShouldCut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const height = ref.current.getBoundingClientRect().height;

    if (height >= maxHeight) setShouldCut(true);
  }, [ref.current, maxHeight]);

  const unCut = () => {
    setShouldCut(false);
  };

  return { ref, shouldCut, unCut };
};
