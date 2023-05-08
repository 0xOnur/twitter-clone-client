import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@redux/config/store";
import jwttDecode from "jwt-decode";
import { useEffect } from "react";
import { updateAccessToken } from "api/userApi";
import { logoutUser } from "@redux/slices/userSlice";

interface IDecoded {
  _id: string;
  iat: number;
  exp: number;
}

export const useAuth = () => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const accessToken = reduxUser.accessToken;
  const refreshToken = reduxUser.refreshToken;
  const userId = reduxUser.user?._id;

  useEffect(() => {
    if (accessToken && refreshToken) {
      const decoded = jwttDecode<IDecoded>(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        dispatch(updateAccessToken(userId)).then((res) => {
          if (res.meta.requestStatus === "rejected") {
            dispatch(logoutUser());
          }
        });
      }
    }
  }, [dispatch, refreshToken, accessToken, userId]);
};
