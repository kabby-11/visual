import Image from "next/image";

export function EmptySearch() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-search.png" alt="Empty" height={250} width={250} />
      <h2 className="text-2xl font-semibold mt-6">No results found!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else
      </p>
    </div>
  );
}