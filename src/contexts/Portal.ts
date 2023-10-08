import { createPortal } from "react-dom";

interface IProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: IProps) => {
  return createPortal(children, document.body);
};
