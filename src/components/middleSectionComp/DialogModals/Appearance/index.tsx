import Header from "./Header";
import Font from "./Font";
import { useAppearance } from "@redux/slices/appearanceSlice";
import ExampleTweet from "./ExampleTweet";
import Color from "./Color";
import Theme from "./Theme";
import DoneButton from "./DoneButton";

interface IProps {
  closeModal: () => void;
}

const AppearanceDialog = ({ closeModal }: IProps) => {
  const { theme, color, fontSize } = useAppearance();

  return (
    <div className="z-10 bg-[color:var(--background-primary)] w-full max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="flex flex-col w-full min-h-400px">
          <Header />
          <div className="flex flex-col p-8 pt-0">
            <ExampleTweet />

            <div className="grid gap-3">
              <Font fontSize={fontSize} />
              <Color color={color} />
              <Theme color={color} theme={theme} />
            </div>
            <div className="flex items-center justify-center pt-4">
              <DoneButton close={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceDialog;
