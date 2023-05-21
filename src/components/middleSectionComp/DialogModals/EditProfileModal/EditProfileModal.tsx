import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CancelIcon, LoadingIcon } from "@icons/Icon";
import { IUser } from "@customTypes/UserTypes";
import { usernameIsAvailable } from "api/userApi";
import useToast from "@hooks/useToast";
import { UserCardComp } from "@components/middleSectionComp/UserProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/config/store";
import { updateUser, updateRedux } from "api/userApi";
import InputField from "./InputField";

interface IProps {
  isOpen: boolean;
  user: IUser;
  onClose: () => void;
}

type Cover = {
  cover: File | null;
  coverURL: string | null;
};

type Avatar = {
  avatar: File | null;
  avatarURL: string | null;
};

const EditProfileModal = ({ user, isOpen, onClose }: IProps) => {
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const formData = new FormData();

  const { showToast } = useToast();
  const [cover, setCover] = useState<Cover>({
    cover: new File([], ""),
    coverURL: user.cover!,
  });

  const [avatar, setAvatar] = useState<Avatar>({
    avatar: new File([], ""),
    avatarURL: user.avatar!,
  });

  const [userInfo, setUserInfo] = useState({
    displayName: user.displayName,
    username: user.username,
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });

  const editProfileQuery = useMutation(updateUser, {
    onSuccess: () => {
      dispatch(updateRedux(user.username));
      queryClient.invalidateQueries(["user", user.username]);
      showToast("Profile Updated", "success");
      onClose();
    },
  });

  const checkUsernameQuery = useQuery({
    queryKey: ["usernameIsAvailable", userInfo.username],
    queryFn: () => usernameIsAvailable(userInfo.username),
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isChanges = () => {
    const originalState = {
      cover: user.cover,
      avatar: user.avatar,
      displayName: user.displayName,
      username: user.username,
      bio: user.bio,
      location: user.location,
      website: user.website,
    };

    const currentState = {
      cover: cover.coverURL === null ? undefined : cover.coverURL,
      avatar: avatar.avatarURL === null ? undefined : avatar.avatarURL,
      displayName: userInfo.displayName,
      username: userInfo.username,
      bio: userInfo.bio === "" ? undefined : userInfo.bio,
      location: userInfo.location,
      website: userInfo.website,
    };
    console.log({
      originalState,
      currentState,
    });

    return JSON.stringify(originalState) !== JSON.stringify(currentState);
  };

  const handleSave = () => {
    if (isChanges()) {
      if (user.username !== userInfo.username) {
        checkUsernameQuery.refetch().then((response) => {
          console.log(response.data);
          if (response.data) {
            formData.append("username", userInfo.username);
            console.log("Save");
          } else {
            showToast("Username is already taken.", "error");
          }
        });
      }
      formData.append("cover", cover.cover!);
      formData.append("avatar", avatar.avatar!);
      formData.append("displayName", userInfo.displayName);
      formData.append("bio", userInfo.bio);
      formData.append("location", userInfo.location);
      formData.append("website", userInfo.website);

      editProfileQuery.mutate(formData);
    } else {
      console.log("No changes");
      showToast("No Changes", "info");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed cursor-default inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-60" />
      {editProfileQuery.isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingIcon />
        </div>
      ) : (
        <div className="z-10 border-2 shadow-2xl text-black bg-white w-full max-w-600px min-h-400px rounded-xl overflow-hidden">
          <div className="overflow-y-auto max-h-90vh">
            <div className="">
              <div className="sticky top-0 z-20">
                <div className="flex flex-row h-[53px] justify-between items-center p-3 bg-white/75  backdrop-blur-md border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-3 hover:bg-gray-extraLight rounded-full"
                  >
                    <CancelIcon className={"w-5 h-5"} />
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="min-w-32px min-h-[32px] px-4 bg-black hover:brightness-125 rounded-full"
                  >
                    <span className="text-white font-bold">Save</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col pb-4">
                <div className="flex pb-16">
                  <UserCardComp.EditCoverAndAvatar
                    cover={cover}
                    setCover={setCover}
                    avatar={avatar}
                    setAvatar={setAvatar}
                  />
                </div>
                <InputField
                  type="input"
                  value={userInfo.displayName}
                  maxLength={50}
                  labelText={"Name"}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      displayName: e.target.value,
                    })
                  }
                />

                <InputField
                  type="input"
                  value={userInfo.username}
                  maxLength={30}
                  labelText={"Username"}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      username: e.target.value,
                    })
                  }
                />

                <InputField
                  type="textarea"
                  value={userInfo.bio}
                  maxLength={160}
                  labelText={"Bio"}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      bio: e.target.value,
                    })
                  }
                />

                <InputField
                  type="input"
                  value={userInfo.location}
                  maxLength={30}
                  labelText={"Location"}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      location: e.target.value,
                    })
                  }
                />

                <InputField
                  type="input"
                  value={userInfo.website}
                  maxLength={100}
                  labelText={"Website"}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      website: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;
