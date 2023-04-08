import React from "react";
import { useLocation } from 'react-router-dom';


interface IProps {
    name: string;
    Icon: ({ isActive }: {isActive: any}) => JSX.Element;
};

const SideLink: React.FC<IProps> = ({name, Icon}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = currentPath.includes(name.toLowerCase());

  return (
    <li className="group">
      <a
        href={name.toLowerCase()}
        className="text-left cursor-pointer block text-xl mb-2"
      >
        <div className="inline-block">
          <div
            className=
            {`flex group-hover:bg-gray-lightest duration-100 rounded-full pl-3 pr-3 py-3
              ${isActive ? "font-bold" : ""}
            `}
            >
            <div className="">
              <Icon isActive={isActive} />
            </div>
            <span className="ml-4 hidden lg:inline-block">{name}</span>
          </div>
        </div>
      </a>
    </li>
  );
};

export default React.memo(SideLink);