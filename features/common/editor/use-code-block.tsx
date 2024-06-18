import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";

export const useCodeBlock = (editor: Editor) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const addCodeBlock = () => {
    setIsOpen(false);
    if (!selectedLanguage && editor.isActive("codeBlock"))
      editor.chain().focus().toggleCodeBlock().run();
    else if (selectedLanguage)
      editor.chain().focus().setCodeBlock({ language: selectedLanguage }).run();
  };

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  const onLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  useEffect(() => {
    const insertOnEnter = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Enter") {
        setIsOpen(false);
        addCodeBlock();
      }
    };
    window.addEventListener("keydown", insertOnEnter);
    return () => window.removeEventListener("keydown", insertOnEnter);
  }, [isOpen, selectedLanguage]);

  return {
    isOpen,
    addCodeBlock,
    selectedLanguage,
    onOpenChange,
    onLanguageChange,
  };
};
