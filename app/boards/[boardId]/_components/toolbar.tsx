import { Skeleton } from "@/components/ui/skeleton";
import { differenceInBusinessDays } from "date-fns"
import { ToolButton } from "./toolButton";
import { MousePointer2, Type, StickyNote, Square, Circle, Pencil, Eraser, Download ,LogOut, Grid3X3, Undo2, Redo2} from "lucide-react"
import { BsBorderWidth, BsFillImageFill} from "react-icons/bs";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import Exit from "./exit";
import { GridPatternDashed } from "./gridPattern";
// import BackgroundPicker from "./backgroundPicker";




interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    toggleGrid: () => void;

}

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
    toggleGrid,
} : ToolbarProps) => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 grid grid-cols-2 gap-y-1 items-center shadow-md">
                <ToolButton 
                label = "Select"
                icon={ MousePointer2}               
                 onClick = {() => setCanvasState({mode : CanvasMode.None})}
                 isActive = {
                    canvasState.mode === CanvasMode.None ||
                    canvasState.mode === CanvasMode.Translating ||
                    canvasState.mode === CanvasMode.SelectionNet ||
                    canvasState.mode === CanvasMode.Pressing ||
                    canvasState.mode === CanvasMode.Resizing
                    
                 }
                />
                <ToolButton 
                label = "Text"
                icon={ Type}               
                 onClick = {() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Text,
                 })}
                 isActive = {
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Text
                 }
                />
                <ToolButton 
                label = "Sticky note"
                icon={ StickyNote}               
                onClick = {() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Note,
                 })}
                 isActive = {
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Note
                 }
                />
                <ToolButton 
                label = "Rectangle"
                icon={ Square }               
                onClick = {() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Rectangle,
                 })}
                 isActive = {
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Rectangle
                 }
                />
                <ToolButton 
                label = "Ellipse"
                icon={ Circle }               
                onClick = {() => setCanvasState({
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Ellipse,
                 })}
                 isActive = {
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Ellipse
                 }
                />
                <ToolButton 
                label = "Pencil"
                icon={ Pencil }               
                 onClick = {() => setCanvasState({
                    mode: CanvasMode.Pencil,
                    
                 })}
                 isActive = {canvasState.mode === CanvasMode.Pencil }
                />
                {/* <ToolButton 
                label = "Width"
                icon={ BsBorderWidth }               
                 onClick = {() => {}}
                 isActive = {false}
                /> */}
                {/* <ToolButton 
                label = "Eraser"
                icon={ Eraser }               
                onClick = {() => setCanvasState({
                    mode: CanvasMode.Eraser,
                    
                 })}
                 isActive = {
                    canvasState.mode === CanvasMode.Eraser 
                 }
                /> */}
                {/* <ToolButton 
                label = "Add Image"
                icon={ BsFillImageFill }               
                 onClick = {() => {}}
                 isActive = {false}
                /> */}
                {/* <ToolButton 
                label = "Download"
                icon={ Download }               
                 onClick = {() => {}}
                 isActive = {false}
                /> */}
                <ToolButton 
                label = "Grid"
                icon={ Grid3X3 }               
                 onClick = {toggleGrid}
                 isActive = {false}
                />
                
                <Exit />
            </div>
            <div className="bg-white rounded-md p-1.5 grid grid-cols-2 gap-y-1 items-center shadow-md">
            <ToolButton 
                label = "Undo"
                icon={ Undo2 }               
                 onClick = {undo}
                 isActive = {!canUndo}
                />
                <ToolButton 
                label = "Redo"
                icon={ Redo2 }               
                 onClick = {redo}
                 isActive = {!canRedo}
                />
            </div>

        </div>
    );
};

export function ToolbarSkeleton() {
    return (
      <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
    );
  }
  