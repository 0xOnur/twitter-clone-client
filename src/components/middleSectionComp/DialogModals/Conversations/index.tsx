import React, { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import CreateGroup from "./CreateGroup";
import Header from "./Header";

const ChatComposeModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();

  const navigate = useNavigate();

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        navigate(-1);
      }
    },
    [modalRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div ref={modalRef} className="fixed inset-0 bg-black opacity-60" />
      <div className="z-10 border-2 shadow-2xl text-black bg-white w-full max-w-600px min-h-400px rounded-xl overflow-hidden">
        <div className="overflow-y-auto max-h-90vh">
          <div className="sticky top-0 z-20">
            <Header />

            <div className="flex flex-col">
              <Search />
              <CreateGroup />
            </div>
          </div>
          <div ref={ref} className="h-56" />
        </div>
      </div>
    </div>
  );
};

export default ChatComposeModal;
