import { RootState } from "@redux/config/store";
import { setNotification, setMessageNotification } from "@redux/slices/userSlice";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

type SocketContextProps = {
  socket?: Socket;
};

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);

const SocketProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(baseURL!, {
        transports: ["websocket"],
        auth: { userId: user?._id },
      });

      setSocket(newSocket);

      return () => {
        newSocket.removeAllListeners();
        newSocket.disconnect();
      };
    }
  }, [isAuthenticated, baseURL, user]);


  useEffect(() => {
    if(socket) {
      socket.on("getMessage", (data: IMessage) => {
        dispatch(setMessageNotification(data));
        queryClient.invalidateQueries(["chats"]);
        queryClient.invalidateQueries(["chat", data.chat]);
        queryClient.invalidateQueries(["chatMessages", data.chat]);
      });
      
      socket.on("readMessage", (data: IMessage) => {
        queryClient.invalidateQueries(["chats"]);
        queryClient.invalidateQueries(["chatMessages", data.chat]);
      });

      socket.on("getNotification", (data: INotification) => {
        dispatch(setNotification(data))
      })
    }
  }, [socket, queryClient, dispatch])

  const SocketContextValues = useMemo(
    () => ({ socket }),
    [socket]
  );


  return (
    <SocketContext.Provider value={SocketContextValues}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
export { useSocketContext };
