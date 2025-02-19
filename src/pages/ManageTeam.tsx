import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { useAuth } from "@/hooks/use-auth";
import { getMyTeam } from "@/services/peerApi";
import { inviteMember } from "@/services/inviteApi";
import { Member } from "@/types/api/member";
import { InviteMemberDialog } from "@/components/members/InviteMemberDialog";
import { MemberCard } from "@/components/members/MemberCard";

const ManageTeam = () => {
  const { user, token } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getMyTeam(token);
        const noTeamsFound = response.statusCode === 200 && response.data.teams?.length === 0;

        if (response.statusCode === 404 || noTeamsFound) {
          navigate("/create-team");
          return;
        }

        const teamMembers = response.data.teams[0].members.map((member: Member) => ({
          id: member.id,
          name: member.name,
          email: member.email,
          profileUrl: member.profileUrl,
          isPending: false,
        }));

        const pendingMembers = response.data.teams[0].pendingMembers.map(
          (member: Member) => ({
            id: member.id,
            name: member.name,
            email: member.email,
            profileUrl: member.profileUrl,
            isPending: true,
          })
        );

        setMembers([...teamMembers, ...pendingMembers]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    };

    if (user) {
      fetchTeam();
    }
  }, [user, token, navigate, toast]);

  const filteredMembers = members.filter((member) =>
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
      setMembers([...members, member]);
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
    setMembers(members.filter((u) => u.id !== member.id));
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

        {members.length > 0 ? (
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
