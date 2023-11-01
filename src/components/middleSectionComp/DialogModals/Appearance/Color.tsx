import React from "react";
import { colors } from "@utils/consts";
import { setColor } from "@redux/slices/appearanceSlice";
import { useDispatch } from "react-redux";

interface IProps {
  color: IColors;
}

const Color = ({ color }: IProps) => {
  const dispatch = useDispatch()
  return (
    <section>
      <h6 className="text-[color:var(--color-base-secondary)] mb-1 leading-5 text-[13px] font-bold">
        Color
      </h6>
      <div className="bg-[color:var(--background-secondary)] py-2 rounded-2xl flex justify-around items-center">
        {colors.map((c, index) => (
          <button
            key={index}
            onClick={() => {
              dispatch(setColor({
                ...color,
                ...c,
              }));
            }}
            style={
              {
                "--bg": c.primary,
              } as React.CSSProperties
            }
            className="w-[40px] h-[40px] rounded-full bg-[color:var(--bg)] flex items-center justify-center text-white"
          >
            {color.primary === c.primary && (
              <svg viewBox="0 0 24 24" width={25}>
                <path
                  fill="currentColor"
                  d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Color;
