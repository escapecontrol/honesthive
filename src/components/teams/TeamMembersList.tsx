import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Member } from "@/types/api/member";

interface TeamMembersListProps {
  members: Member[];
  onMemberSelect: (member: Member) => void;
}

export const TeamMembersList = ({ members, onMemberSelect }: TeamMembersListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Team Members</h2>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        {members.length === 0 ? (
          // Skeleton loading states
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          filteredMembers.map((member) => (
            <Card 
              key={member.id}
              className="p-4 hover:bg-muted cursor-pointer transition-colors"
              onClick={() => onMemberSelect(member)}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.profileUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{member.name}</h3>
                    <span className="text-sm text-muted-foreground">{member.lastActive}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Click to give feedback</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};