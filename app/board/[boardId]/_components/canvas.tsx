"use client";

import { Info } from "./info";
import { Participant } from "./participants";
import { Toolbar } from "./toolbar";
import { useSelf } from "@/liveblocks.config";

interface CanvasProps{
    boardId: string;
};
export const Canvas = ({
    boardId,
}: CanvasProps) => {
    return (
        <main
        className="h-full w-full relative bg-neutral-100 touch-none">
            <Info />
            <Participant />
            <Toolbar />
        </main>
    )
}