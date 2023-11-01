import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  username: string;
  url: string;
}

const ReplyTo = ({ username, url }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-[auto,1fr]">
      <span className="mr-1 line-clamp-1">Replying to</span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          navigate(url);
        }}
        className="truncate text-[color:var(--color-primary)] hover:underline cursor-pointer"
      >
        @{username}
      </span>
    </div>
  );
};

export default ReplyTo;
