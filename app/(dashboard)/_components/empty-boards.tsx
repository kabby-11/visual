"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

//Steps:
// -> created a router, a variable organization and mutate:create and isLoading came from the api board
// -> Created a function that will handle the click. Because right after clicking the button a new Board will be created
// -> This new board will be created with a small popup window in the right lower corner of the screen
// -> Along with that router will push open the new board with the link `/board/${id}`. If not then it will throw an error

export function EmptyBoards() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate: create, isLoading } = useApiMutation(api.board.create);

  const handleClick = () => {
    if (!organization) return;

    create({
      title: "Untitled",
      orgId: organization.id,
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-boards.png" alt="Empty" height={250} width={250} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={handleClick} disabled={isLoading}>
          Create board
        </Button>
      </div>
    </div>
  );
}