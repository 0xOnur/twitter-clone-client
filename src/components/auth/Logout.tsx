import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/config/store";
import { logoutUser } from "api/userApi";
import { LoadingIcon } from "@icons/Icon";
import { persistor } from "@redux/config/store";

const Logout = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const reduxUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (reduxUser.isAuthenticated) {
            dispatch(logoutUser(reduxUser.user._id)).then(() => {
                setTimeout(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    persistor.purge();
                    navigate("/");
                }, 3000);
            });
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
