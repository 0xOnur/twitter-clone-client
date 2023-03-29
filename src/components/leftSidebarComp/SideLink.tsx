import React from "react";

//props types
type Props = {
    name: string;
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    active: string;
    onMenuItemClick: (name: string) => void;
};

const SideLink: React.FC<Props> = (props) => {
  const isActive = props.active === props.name;
  return (
    <li className="group" onClick={() => props.onMenuItemClick(props.name)}>
      <a
        href={props.name.toLowerCase()}
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
              <props.Icon />
            </div>
            <span className="ml-4 hidden lg:inline-block">{props.name}</span>
          </div>
        </div>
      </a>
    </li>
  );
};

export default React.memo(SideLink);