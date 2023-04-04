import React from 'react'

interface Props {
    isForYou: boolean
    setIsForYou: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = (props) => {
    return (
      <div className="sticky top-0 z-10">
        <div className="h-auto  backdrop-blur-md bg-white/80 ">
          <div className="h-full">
            <a href="/">
              <div className=" cursor-pointer z-10 p-3">
                <h1 className="text-2xl font-bold">Home</h1>
              </div>
            </a>
          </div>
          <div className="flex w-full h-14">
            <div className="w-full h-full flex col-span-2">
              <button
                onClick={() => {
                  props.setIsForYou(true);
                }}
                className="flex justify-center w-full cursor-pointer hover:bg-gray-extraLight duration-150"
              >
                <div className="relative h-14 flex items-center w-fit">
                  <h1 className={` ${props.isForYou && "font-bold"}`}>For You</h1>
                  {props.isForYou && (
                    <div className="h-1 bg-primary-base absolute bottom-0 w-full rounded-full"></div>
                  )}
                </div>
              </button>
  
              <button
                onClick={() => {
                  props.setIsForYou(false);
                }}
                className="flex justify-center w-full cursor-pointer hover:bg-gray-extraLight duration-150"
              >
                <div className="relative h-14 flex items-center w-fit">
                  <h1 className={` ${!props.isForYou && "font-bold"}`}>
                    Following
                  </h1>
                  {!props.isForYou && (
                    <div className="h-1 bg-primary-base absolute bottom-0 w-full rounded-full"></div>
                  )}
                </div>
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  };

export default Header