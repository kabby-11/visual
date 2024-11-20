"use client";

import {
  colorToCss,
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
  
} from "@/lib/utils";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import type { Side, XYWH } from "@/types/canvas";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CursorPresence } from "./cursors-presence";
import { Info } from "./info";
import { LayerPreview } from "./layer-preview";
import { Participant } from "./participants";   
// import { Path } from "./path";
// import { SelectionTools } from "./selectionTools";
import { Toolbar } from "./toolbar";
import { SelectionBox } from "./selection-box";

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
//   const pencilDraft = useSelf((self) => self.presence.pencilDraft);

  const selections = useOthersMapped((other) => other.presence.selection);

 

    //using memoization to reduce memory usage
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  //updating canvasState using setCanvasState
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  //updating camera using setCamera
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  //updating lastUsedColor using setLastUsedColor
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");

        //generated random Id  and assigned to each layer
      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor]
  );

  const translateSelectedLayer = useMutation((
    {storage, self },
    point: Point,
  ) => {
    if(canvasState.mode !== CanvasMode.Translating) {
      return;
    }

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y,
    };


    const liveLayers = storage.get("layers");
    
    for(const id of self.presence.selection){
      const layer = liveLayers.get(id);
      if(layer){
        layer.update({
           x: layer.get("x")+ offset.x, 
           y: layer.get("y") + offset.y });
      }
    }

    setCanvasState({
      mode: CanvasMode.Translating,
      current: point,
    })
  }, [
    canvasState,
  ]);


  const resizeSelectedLayer = useMutation((
    { storage, self },
    point: Point,
  ) => {
    if(canvasState.mode !== CanvasMode.Resizing) {
      return;

    }
    const bounds = resizeBounds(
      canvasState.initialBounds,
      canvasState.corner,
      point,
    );

    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if(layer){
      layer.update(bounds);
    }

    }, [canvasState]);

  const onResizeHandlePointerDown = useCallback((
    corner: Side,
    initialBounds: XYWH,

  ) => {
    history.pause();
    setCanvasState({ mode: CanvasMode.Resizing, initialBounds, corner });
  }, [history]
);



    //for exploring the canvas while using mouse wheel
    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
    }));

   
}, []);

//generally when pointer is moving in the canvas 
    const onPointerMove = useMutation((
        {setMyPresence}, 
        e:React.PointerEvent
    ) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        if(canvasState.mode === CanvasMode.Translating){
          translateSelectedLayer(current);
        }

        else if(canvasState.mode === CanvasMode.Resizing) {
          resizeSelectedLayer(current);
        } 

        setMyPresence({ cursor:current});
    }, [
      canvasState,
      history,
      resizeSelectedLayer,
    ]
    );

    //if the pointer leave the screen
    const onPointerLeave = useMutation(({setMyPresence}) => {
        setMyPresence({ cursor: null});
    }, []);

    //if the pointer in on any layer
    const onPointerUp = useMutation((
        {},
        e
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);

        console.log(
            {
                point, 
                mode: canvasState.mode,
            }
        );

        if(canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.layerType, point);
        }else{
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        history.resume();
    },
    [camera, canvasState, history, insertLayer,]
);

const onLayerPointerDown = useMutation((
  {self, setMyPresence},
  e: React.PointerEvent,
  layerId: string,
) => {
  if( canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting){
    return;
  }
  history.pause();
  e.stopPropagation();
  const point = pointerEventToCanvasPoint(e, camera);

  if(!self.presence.selection.includes(layerId)) {
    setMyPresence({
      selection: [layerId]
    },
  {addToHistory: true});
  }
  setCanvasState({mode: CanvasMode.Translating, current: point});
}, [
  setCanvasState,
  camera, 
  history, 
  canvasState.mode,
] );



    return (
        <main
        className="h-full w-full relative bg-neutral-100 touch-none ">
            <Info boardId = {boardId} />
            <Participant />
            <Toolbar 
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            undo={history.undo}
            redo={history.redo}
            canUndo={canUndo}
            canRedo={canRedo}
            />
            <div 
            className="relative w-full h-full overflow-auto"
            
            >
            <svg 
            className = "h-[1000vh] w-[1000vw]"
            onWheel={onWheel}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            onPointerUp={onPointerUp}
            >
                <g
                style ={{
                    transform: `translate(${camera.x}px, ${camera.y}px)`,
                    width: '200%',
                    height: `200%`,
                }}
                >
                    {layerIds.map((layerId) => (
                    <LayerPreview
                        key = {layerId}
                        id = {layerId}
                        onLayerPointerDown={onLayerPointerDown}
                        selectionColor={layerIdsToColorSelection[layerId]}
                    />
                      
                    ))}
                    <SelectionBox 
                      onResizeHandlePointerDown={onResizeHandlePointerDown}
                      />
                    <CursorPresence />
                </g>
            </svg>
            </div>    
        </main>
    )
}


