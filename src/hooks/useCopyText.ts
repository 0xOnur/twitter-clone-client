import useToast from "@hooks/useToast";

interface IProps {
  text: string;
  toastMessage?: string
}

export const useCopyText = ({text, toastMessage}: IProps) => {
  const { showToast } = useToast();

  const copyText = () => {
    navigator.clipboard.writeText(text);
    if (toastMessage) {
      showToast(toastMessage, "info");
    }
  };

  return { copyText };
};
