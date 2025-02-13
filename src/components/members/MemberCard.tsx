import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Member } from "@/types/api/member";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface MemberCardProps {
  member: Member;
  onViewKudos: (member: Member) => void;
  onRemoveMember?: (member: Member) => void;
}

export const MemberCard = ({
  member: member,
  onViewKudos,
  onRemoveMember,
}: MemberCardProps) => {
  const [imgError, setImgError] = useState(false);
  const removeMemberText = member.isPending ? "Cancel Invite" : "Remove Member";
  return (
    <Card className="p-6 card-hover">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.profileUrl} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {!member.isPending && (
              <DropdownMenuItem onClick={() => onViewKudos(member)}>
                View Kudos
              </DropdownMenuItem>
            )}
            {onRemoveMember && (
              <DropdownMenuItem
                onClick={() => onRemoveMember(member)}
                className="text-red-600 focus:text-red-600"
              >
                {removeMemberText}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
