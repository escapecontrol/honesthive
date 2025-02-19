import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { useAuth } from "@/hooks/use-auth";
import { inviteMember } from "@/services/inviteApi";
import { Member } from "@/types/api/member";
import { InviteMemberDialog } from "@/components/members/InviteMemberDialog";
import { MemberCard } from "@/components/members/MemberCard";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/UserAtom";

const ManageTeam = () => {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [appUser, setAppUser] = useAtom(userAtom);

  if (!appUser.team.id) {
    navigate("/create-team");
    return null;
  }

  const filteredMembers = appUser.team.members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteMember = async (newMember: Omit<Member, "id">) => {
    try {
      const { data, statusCode, message } = await inviteMember(token, newMember.email);

      if (!data || statusCode >= 400) {
        toast({
          title: "Error",
          description: message ? message : "Failed to invite team member",
          variant: "destructive",
        });
        return;
      }

      const member: Member = {
        id: data.id,
        ...newMember,
        isPending: true,
      };

      setAppUser(prev => ({
        ...prev,
        team: {
          ...prev.team,
          members: [...prev.team.members, member]
        }
      }));

      toast({
        title: "Success",
        description: "Team member invited successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleViewKudos = (member: Member) => {
    navigate("/view-kudos", {
      state: { userName: member.name, userEmail: member.email },
    });
  };

  const handleRemoveMember = (member: Member) => {
    setAppUser(prev => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.filter(m => m.id !== member.id)
      }
    }));

    toast({
      title: "Member Removed",
      description: `${member.name} has been removed from the team.`,
    });
  };

  return (
    <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center animate-fade-down">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Manage Team Members
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Add and manage team members to enable peer kudos feedback.
          </p>
        </div>

        {appUser.team.members.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Input
                type="search"
                placeholder="Search team members..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InviteMemberDialog
                onInviteMember={handleInviteMember}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              />
            </div>

            <div className="grid gap-2">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onViewKudos={handleViewKudos}
                  onRemoveMember={handleRemoveMember}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <EmptyState
              icon={UserPlus}
              title="No team members yet"
              description="Start building your team by inviting members to join."
            />
            <center>
              <InviteMemberDialog
                onInviteMember={handleInviteMember}
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
              />
            </center>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageTeam;
