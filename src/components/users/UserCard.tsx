import { Card } from "@/components/ui/card";
import { User } from "@/types/user";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  user: User;
  onViewKudos: (user: User) => void;
  onRemoveMember?: (user: User) => void;
}

export const UserCard = ({ user, onViewKudos, onRemoveMember }: UserCardProps) => {
  return (
    <Card className="p-6 card-hover">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onViewKudos(user)}>
              View Kudos
            </DropdownMenuItem>
            {onRemoveMember && (
              <DropdownMenuItem 
                onClick={() => onRemoveMember(user)}
                className="text-red-600 focus:text-red-600"
              >
                Remove Member
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};