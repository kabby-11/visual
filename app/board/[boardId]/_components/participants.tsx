import { Skeleton } from "@/components/ui/skeleton"

export const Participant = () => {
    return (
        <div className="absolute top-2 right-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            List of Users!
        </div>
    )
}  

Participant.Skeleton = function ParticipantsSkeleton(){
    return (
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items items-center shadow-md w-[100px]">
            <Skeleton className="h-full w-full bg-muted-400" />
        </div>
    )
}