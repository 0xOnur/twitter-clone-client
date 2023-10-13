import { useState, useCallback, useEffect } from "react";
import { usePopper } from "react-popper";
import { Portal } from "contexts/Portal";
import { MoreIcon } from "@icons/Icon";
import Menu from "./Menu";

const MoreButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "offset", options: { offset: [0, -60] } }],
  });

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(e.target as Node) &&
        !referenceElement?.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    },
    [popperElement, referenceElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div>
      <button
        ref={setReferenceElement}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        className="flex flex-col lg:items-start items-center cursor-pointer grow-1 w-full py-1 group"
      >
        <div className="flex group-hover:bg-gray-lightest rounded-full pl-3 pr-3 py-3">
          <div>
            <MoreIcon />
          </div>
          <span className="ml-5 mr-4 text-xl hidden lg:inline-block">More</span>
        </div>
      </button>

      {menuOpen && (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Menu />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default MoreButton;
