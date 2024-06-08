import { useLayoutEffect, useRef } from "react";
import { Textarea } from "./textarea";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const AutoresizeTextarea = (props: TextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  function adjustHeight() {
    ref.current!.style.height = "auto";
    ref.current!.style.height = `${ref.current!.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleKeyDown() {
    adjustHeight();
  }

  return (
    <Textarea
      onKeyDown={handleKeyDown}
      className="overflow-hidden resize-none"
      {...props}
      ref={ref}
    />
  );
};
