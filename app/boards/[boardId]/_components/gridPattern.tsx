"use client";

import GridPattern from "@/components/ui/grid-pattern";

export function GridPatternDashed() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
      />
    </div>
  );
}
