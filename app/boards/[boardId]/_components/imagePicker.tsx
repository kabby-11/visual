"use client";

import { useMutation, useStorage } from "@/liveblocks.config";
import { optimizeImage } from "@/lib/optimizeImage";
import { BsFillImageFill } from "react-icons/bs";
import { ToolButton } from "./toolButton";
import { LiveObject } from "@liveblocks/client";
import { useEffect } from "react";

const ImagePicker = () => {
  // Access moveImage from Liveblocks storage
  const moveImage = useStorage(
    (root) => root.moveImage
  ) as unknown as LiveObject<{
    base64: string;
    x?: number;
    y?: number;
  }>;
  console.log("MOVE_IMAGE: ", moveImage);

  // if (!moveImage || !(moveImage instanceof LiveObject)) {
  //   console.error("moveImage is not properly configured in storage.");
  //   return null; // Prevent rendering if configuration is broken
  // }

  // Mutation to create a new image layer
  const addImageLayer = useMutation(({ storage }) => {
    const layers = storage.get("layers");
    const layerIds = storage.get("layerIds");

    const base64 = moveImage.get("base64");
    console.log("base64 : ", base64);
    if (base64) {
      const newLayerId = `image-${Date.now()}`;
      const imageLayer = new LiveObject({
        id: newLayerId,
        type: "image",
        src: base64,
        x: moveImage.get("x") || 50,
        y: moveImage.get("y") || 50,
        width: 200, // Default dimensions
        height: 200,
      });
      console.log("IMAGE LAYER: ", imageLayer);

      layers.set(newLayerId, imageLayer);
      layerIds.push(newLayerId);

      // Reset moveImage
      moveImage.update({ base64: "", x: 50, y: 50 });
    }
  }, []);

  // Function to update moveImage with new data
  const updateMoveImage = (newBase64: string, x = 50, y = 50) => {
    moveImage.update({ base64: newBase64, x, y });
    addImageLayer(); // Trigger layer addition after updating
  };

  // Handle file input for image selection
  const handleImageInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", () => {
      if (fileInput && fileInput.files?.length) {
        const file = fileInput.files[0];
        optimizeImage(file, (uri) => updateMoveImage(uri));
      }
    });
  };

  // Handle paste events for adding images
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.includes("image")) {
            const file = item.getAsFile();
            if (file) optimizeImage(file, (uri) => updateMoveImage(uri));
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [updateMoveImage]);

  return (
    <ToolButton
      label="Add Image"
      icon={BsFillImageFill}
      onClick={handleImageInput}
      isActive={false}
    />
  );
};

export default ImagePicker;
