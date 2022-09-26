import socketio from "socket.io-client";
import io from "socket.io-client";
import React from "react";

const SOCKET_URL = "http://localhost:8000";

// export const socket = io.connect(SOCKET_URL);
export const socket = "test";
export const SocketContext = React.createContext();
