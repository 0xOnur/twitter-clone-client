import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/config/store";
import { LoadingIcon } from "@icons/Icon";
import { persistor } from "@redux/config/store";
import { logoutUser } from "redux/slices/userSlice";
import useToast from "@hooks/useToast";

const Logout = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const reduxUser = useSelector((state: RootState) => state.user);
  const {showToast} = useToast();
  useEffect(() => {
    if (reduxUser.isAuthenticated) {
      setTimeout(() => {
        dispatch(logoutUser());
        persistor.purge();
        showToast("Logged out", "success");
        navigate("/");
      }, 1000);
    } else {
      navigate("/");
    }
  }, [dispatch]);

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <LoadingIcon />
    </div>
  );
};

export default Logout;
