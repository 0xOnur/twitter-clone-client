import { RetryIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  refetch: () => void;
  customClassName?: string;
}

const RefetchError = ({refetch, customClassName}: IProps) => {
  const className = classNames(
    {
      "flex flex-col max-w-600px w-full h-screen justify-center items-center py-5 px-3": !customClassName,
      [customClassName!]: !!customClassName
    }
  )
  console.log("🚀 ~ file: RefetchError.tsx:16 ~ RefetchError ~ className:", className)
  return (
    <div className={className}>
      <span className="mb-5 text-center text-[color:var(--color-base)]">
        Something went wrong. Try reloading.
      </span>
      <button
        onClick={() => refetch()}
        className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-[color:var(--color-primary)] hover:opacity-80 duration-200 rounded-full"
      >
        <RetryIcon className="w-6 h-6 text-white" />
        <span className="font-bold text-white">Retry</span>
      </button>
    </div>
  );
};

export default RefetchError;
