import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";

import { createRoomContext } from "@liveblocks/react";
import type { Layer, Color } from "@/types/canvas";

// Define the client and move the resolveUsers and resolveMentionSuggestions options here
const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 16,
  resolveUsers: async ({ userIds }) => {
    // This function is now placed within the `createClient` options
    // Used only for Comments. Return a list of user information retrieved
    // from `userIds`. This info is used in comments, mentions, etc.

    // Example: Fetch user data from your database or API
    // const usersData = await __fetchUsersFromDB__(userIds);

    return []; // Replace with actual user data
  },
  resolveMentionSuggestions: async ({ text, roomId }) => {
    // Used only for Comments. Return a list of userIds that match `text`.
    // These userIds are used to create a mention list when typing in the composer.

    // Example: Fetch all userIds based on the `roomId`
    // const userIds = await __fetchAllUserIdsFromDB__(roomId);

    return []; // Replace with actual logic for matching users
  },
});

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the  
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  pencilColor: Color | null;
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
  moveImage: LiveObject<{ base64: string; x?: number; y?: number }>;
};

// Optionally, UserMeta represents static/readonly metadata on each user, as
// provided by your own custom auth back end (if used). Useful for data that
// will not change during a session, like a user's name or avatar.
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
type RoomEvent = {
  // type: "NOTIFICATION",
  // ...
};

// Optionally, when using Comments, ThreadMetadata represents metadata on
// each thread. Can only contain booleans, strings, and numbers.
export type ThreadMetadata = {
  // resolved: boolean;
  // quote: string;
  // time: number;
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);
