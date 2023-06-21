import { HeaderComp } from "..";
import Peoples from "./Peoples";

const ConnectPeople = () => {
    return (
        <div className="container max-w-600px w-full border-x">
          <HeaderComp.Header
            pageType="Profile"
            headerTitle="Connect"
          />
          <Peoples />
        </div>
      );
};

export default ConnectPeople;
