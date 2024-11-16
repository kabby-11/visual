"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";



export const Room = ({ 
    children, 
    roomId 
}: { 
    children: ReactNode
    roomId: string ;
}) => {
  //used fallback because if the room is not loaded then we will have al alternative for it.
  return (
    // <LiveblocksProvider publicApiKey={process.env.LIVEBLOCKS_PUBLIC_KEY!}>
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth"> 
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}