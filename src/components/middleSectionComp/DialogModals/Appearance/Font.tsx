import { setFontSize } from "@redux/slices/appearanceSlice";
import { fontSizes } from "@utils/consts";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  fontSize: number;
}

const Font = ({ fontSize }: IProps) => {
  const dispatch = useDispatch();
  const [fontSizePercent, setFontSizePercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.querySelector(
        ".active-font-size"
      ) as HTMLElement;
      if (element) {
        setFontSizePercent(element.offsetLeft + 3);
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [fontSize]);

  return (
    <section>
      <h6 className="text-[color:var(--color-base-secondary)] mb-1 leading-5 text-[13px] font-bold">
        Font size
      </h6>
      <div className="bg-[color:var(--background-secondary)] p-4 rounded-2xl flex items-center gap-5">
        <div className="text-[0.813rem]">Aa</div>
        <div className="h-1 bg-[color:var(--color-secondary)] flex-1 rounded-full relative">
          <div
            style={{ width: fontSizePercent }}
            className="absolute h-full top-0 left-0 rounded-full bg-[color:var(--color-primary)]"
          />
          <div className="flex justify-between absolute w-[calc(100%+16px)] -top-3.5 -left-[8px]">
            {fontSizes.map((fs) => (
              <button
                type="button"
                onClick={(e) => {
                  dispatch(setFontSize(fs));
                  console.log(e.currentTarget.offsetLeft);
                }}
                className={classNames(
                  "before:absolute before:inset-0 before:rounded-full before:hover:bg-[color:var(--color-primary)] before:opacity-10 w-8 h-8 rounded-full flex items-center justify-center relative",
                  {
                    "active-font-size": fs === fontSize,
                  }
                )}
              >
                <div
                  className={classNames(
                    "w-3 h-3 rounded-full bg-[color:var(--color-secondary)]",
                    {
                      "w-4 h-4": fs === fontSize,
                      "!bg-[color:var(--color-primary)]": fs <= fontSize,
                    }
                  )}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="text-[1.25rem]">Aa</div>
      </div>
    </section>
  );
};

export default Font;
