import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

interface AddUserDialogProps {
  onAddUser: (user: Omit<User, 'id'>) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddUserDialog = ({ onAddUser, isOpen, onOpenChange }: AddUserDialogProps) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    avatar: "https://i.pravatar.cc/150",
  });
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddUser = () => {
    if (!validateEmail(newUser.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    onAddUser(newUser);
    setNewUser({ name: newUser.name, email: newUser.email, avatar: "https://i.pravatar.cc/" });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
      <Button
        size="lg"
        className="animate-pulse"
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Invite Member
      </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription id="dialog-description">
            Enter the email address of the team member you want to invite.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddUser} disabled={!newUser.email}>
            Invite Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};