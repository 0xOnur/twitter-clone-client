import { useEffect, RefObject } from "react";

const useAutosizeTextArea = (
  textAreaRef: RefObject<HTMLTextAreaElement>,
  value: any
) => {
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;