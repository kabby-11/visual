import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";


interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  return (
    <Room roomId={(await params).boardId} fallback = {<Loading />}>
      <Canvas boardId={(await params).boardId} />
    </Room>
  );
};


export default BoardIdPage;
