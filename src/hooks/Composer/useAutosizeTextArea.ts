import { useEffect, RefObject } from "react";

const useAutosizeTextArea = (
  textAreaRef: RefObject<HTMLTextAreaElement>,
  value: any
) => {
  useEffect(() => {
    
    if (textAreaRef.current) {
    console.log(textAreaRef.current.style.height);

      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      // if scroll height eq. and  over 160px not add pc
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;