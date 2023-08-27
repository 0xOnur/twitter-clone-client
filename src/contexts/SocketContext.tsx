import { RootState } from "@redux/config/store";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

type SocketContextProps = {
  socket?: Socket;
};

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);

const SocketProvider = ({ children }: PropsWithChildren) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    if (isAuthenticated) {
      const newSocket = io(baseURL!, {
        transports: ["websocket"],
        auth: { userId: user._id },
      });

      setSocket(newSocket);

      return () => {
        newSocket.removeAllListeners();
        newSocket.disconnect();
      };
    }
  }, [isAuthenticated]);


  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (message) => {
        console.log("🚀 ~ file: SocketContext.tsx:97 ~ socket.on ~ socket", message)
      })
    }
  }, [socket])

  const SocketContextValues = useMemo(
    () => ({ socket }),
    [socket, isAuthenticated]
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
