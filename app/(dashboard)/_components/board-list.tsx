"use client";

import { useQuery } from "convex/react";
import { EmptyBoards } from "./empty-boards";
import { EmptyFavourites } from "./empty-favourites";
import { EmptySearch } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./boardCard";
import { NewBoardButton } from "./new-board-button";
import { useSearchParams } from "next/navigation";

// -> Created Interface to make sure about all the props gets included.
interface BoardListProps {
  orgId: string;
}

export function BoardList({ orgId }: BoardListProps) {
  const searchParams = useSearchParams();//using hook here
  // "{OR NULL -> || ""} is very important here
  const isfavourites = searchParams.get('favourites') || "";
  const searches = searchParams.get('search') || "";
  const data = useQuery(api.boards.get, { orgId, search: searches, favourites: isfavourites });
  console.log("Data: ", data);



  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {/* -> here 'favourites' is acting like a switch that will select whether we are at Favourite Boards page or Team boards page */}
          {isfavourites ? "Favourite Boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && searches) {
    return <EmptySearch />;
  }

  if (!data?.length && isfavourites) {
    console.log("DataLength_fv", data.length);
    console.log("favourites_value : ", isfavourites);
    return <EmptyFavourites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {isfavourites ? "Favourite Boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavourite={board.isFavourite}
          />
        ))}
    
      </div>
    </div>
  );
}
