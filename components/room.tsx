// "use client";

// import { ReactNode } from "react";
// import {
//   LiveblocksProvider,
//   RoomProvider,
//   ClientSideSuspense,
// } from "@liveblocks/react/suspense";



// export const Room = ({ 
//     children, 
//     roomId 
// }: { 
//     children: ReactNode
//     roomId: string ;
// }) => {
//   return (
//     <LiveblocksProvider publicApiKey={"pk_prod_8IjGccBIbU7Kq0gUPWGuFhFLnXeHiQw5KT_BZHg0Ba0XRERkdCfko_6oa68jHqo4"}>
//       <RoomProvider id={roomId}>
//         <ClientSideSuspense fallback={<div>Loading…</div>}>
//           {children}
//         </ClientSideSuspense>
//       </RoomProvider>
//     </LiveblocksProvider>
//   );
// }