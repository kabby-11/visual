//STEPS:

// 1.Define a boundingBox function:

// -Takes an array of Layer objects.
// -Determines the smallest bounding box that can encompass all given layers.
// -Iterates over each layer to calculate the left, right, top, and bottom boundaries.
// 2.Create a useSelectionBounds hook:

// -Retrieves the selection (list of selected layer IDs) from the user's presence using useSelf.
// -Uses useStorage to access the root and map selected layer IDs to actual Layer objects from root.layers.
// -Filters out invalid layers.
// -Calls boundingBox to compute and return the bounding box of the selected layers.
// 3.Optimization:

// -Uses shallow comparison to optimize re-renders in useStorage.


import { useSelf, useStorage } from "@/liveblocks.config";
import type { Layer, XYWH } from "@/types/canvas";
import { shallow } from "@liveblocks/react";

const boundingBox = (layers: Layer[]): XYWH | null => {
  const first = layers[0];

  if (!first) return null;

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (let i = 1; i < layers.length; i++) {
    const { x, y, width, height } = layers[i];

    if (left > x) {
      left = x;
    }

    if (right < x + width) {
      right = x + width;
    }

    if (top > y) {
      top = y;
    }

    if (bottom < y + height) {
      bottom = y + height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};

export const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((root) => {
    const selectedLayers = selection
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean);

    return boundingBox(selectedLayers);
  }, shallow);
};
