import { Skeleton } from "@/components/ui/skeleton";
import { differenceInBusinessDays } from "date-fns"
import { ToolButton } from "./tool-button";
import { MousePointer2, Type, StickyNote, Square, Circle, Pencil } from "lucide-react"

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton 
                label = "Select"
                icon={ MousePointer2}               
                 onClick = {() => {}}
                 isActive = {false}
                />
                <ToolButton 
                label = "Text"
                icon={ Type}               
                 onClick = {() => {}}
                 isActive = {false}
                />
                <ToolButton 
                label = "Sticky note"
                icon={ StickyNote}               
                 onClick = {() => {}}
                 isActive = {false}
                />
                <ToolButton 
                label = "Rectangle"
                icon={ Square }               
                 onClick = {() => {}}
                 isActive = {false}
                />
                <ToolButton 
                label = "Ellipse"
                icon={ Circle }               
                 onClick = {() => {}}
                 isActive = {false}
                />
                <ToolButton 
                label = "Pencil"
                icon={ Pencil }               
                 onClick = {() => {}}
                 isActive = {false}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <div>Undo</div>
                <div>Redo</div>
            </div>

        </div>
    );
};

Toolbar.Skeleton = function ToolbarSkeleton(){
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md">
            <Skeleton className="h-full w-full bg-muted-foreground" />
        </div>
    )
}