import { Editor } from "@tiptap/react";
import { useState, useEffect, ChangeEventHandler } from "react";

export const useImage = (editor: Editor) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const addImage = () => {
    setIsOpen(false);
    if (imageUrl) editor.chain().focus().setImage({ src: imageUrl }).run();
  };

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const onImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setImageUrl(e.target.value);
  };

  useEffect(() => {
    const insertOnEnter = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Enter") {
        setIsOpen(false);
        addImage();
      }
    };
    window.addEventListener("keydown", insertOnEnter);
    return () => window.removeEventListener("keydown", insertOnEnter);
  }, [isOpen, imageUrl]);

  return { isOpen, addImage, imageUrl, onOpenChange, onImageChange };
};
