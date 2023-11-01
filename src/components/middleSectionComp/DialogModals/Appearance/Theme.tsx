import React from "react";
import {
  setColor,
  setTheme,
  setBoxShadow,
} from "@redux/slices/appearanceSlice";
import classNames from "classnames";
import { useDispatch } from "react-redux";

interface IProps {
  color: IColors;
  theme: ITheme;
}

const Theme = ({ theme, color }: IProps) => {
  const dispatch = useDispatch();

  return (
    <section>
      <h6 className="text-[color:var(--color-base-secondary)] mb-1 leading-5 text-[13px] font-bold">
        Background
      </h6>
      <div className="py-2 px-4 mb-3 grid gap-2 grid-cols-3 bg-[color:var(--background-secondary)] rounded-2xl">
        <button
          onClick={() => {
            dispatch(setColor({
              ...color,
              base: "#0f1419",
              baseSecondary: "#536471",
            }));
            dispatch(
              setTheme({
                name: "light",
                primary: "#ffffff",
                secondary: "#f7f9f9",
                third: "#eff3f4",
                modal: "#00000066",
              })
            );
            dispatch(setBoxShadow(
              "rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px"
            ));
          }}
          className={classNames(
            "h-[62px] pr-3 pl-2 bg-white text-[#0f1419] border font-bold border-white/10 rounded group flex items-center gap-1.5",
            {
              "!border-[color:var(--color-primary)] !border-2":
                theme.name === "light",
            }
          )}
        >
          <div className="w-[40px] h-[40px] rounded-full flex-shrink-0 group-hover:bg-black/5 flex items-center justify-center">
            <div
              className={classNames(
                "w-[20px] h-[20px] rounded-full border-[2px] border-[#b9cad3] flex items-center justify-center",
                {
                  "!border-[color:var(--color-primary)] !bg-[color:var(--color-primary)] text-white":
                    theme.name === "light",
                }
              )}
            >
              {theme.name === "light" && (
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="truncate">Default</div>
        </button>
        <button
          onClick={() => {
            dispatch(setColor({
              ...color,
              base: '#f7f9f9',
		          baseSecondary: '#8b98a5'
            }));
            dispatch(
              setTheme({
                name: "dim",
                primary: '#15202b',
                secondary: '#1e2732',
                third: '#263340',
                modal: '#5b708366'
              })
            );
            dispatch(setBoxShadow(
              "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px"
            ));
          }}
          className={classNames(
            "h-[62px] pr-3 pl-2 bg-[#15202b] text-[#f7f9f9] border font-bold border-white/10 rounded group flex items-center gap-1.5",
            {
              "!border-[color:var(--color-primary)] !border-2":
                theme.name === "dim",
            }
          )}
        >
          <div className="w-[40px] h-[40px] rounded-full flex-shrink-0 group-hover:bg-white/5 flex items-center justify-center">
            <div
              className={classNames(
                "w-[20px] h-[20px] rounded-full border-[2px] border-[#5c6e7e] flex items-center justify-center",
                {
                  "!border-[color:var(--color-primary)] !bg-[color:var(--color-primary)] text-white":
                    theme.name === "dim",
                }
              )}
            >
              {theme.name === "dim" && (
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="truncate">Dim</div>
        </button>
        <button
          onClick={() => {
            dispatch(setColor({
              ...color,
              base: '#e7e9ea',
              baseSecondary: '#71767b',
            }));
            dispatch(
              setTheme({
                name: "dark",
                primary: "#000000",
                secondary: "#16181c",
                third: "#212327",
                modal: "#5b708366",
              })
            );
            dispatch(setBoxShadow(
              "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px"
            ));
          }}
          className={classNames(
            "h-[62px] pr-3 pl-2 bg-black text-[#f7f9f9] border font-bold border-white/10 rounded group flex items-center gap-1.5",
            {
              "!border-[color:var(--color-primary)] !border-2":
                theme.name === "dark",
            }
          )}
        >
          <div className="w-[40px] h-[40px] rounded-full flex-shrink-0 group-hover:bg-white/10 flex items-center justify-center">
            <div
              className={classNames(
                "w-[20px] h-[20px] rounded-full border-[2px] border-[#3e4144] flex items-center justify-center",
                {
                  "!border-[color:var(--color-primary)] !bg-[color:var(--color-primary)] text-white":
                    theme.name === "dark",
                }
              )}
            >
              {theme.name === "dark" && (
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="truncate">Lights out</div>
        </button>
      </div>
    </section>
  );
};

export default Theme;
