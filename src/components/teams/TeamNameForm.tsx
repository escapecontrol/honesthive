import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamNameFormProps {
  teamName: string;
  onChange: (value: string) => void;
}

export function TeamNameForm({ teamName, onChange }: TeamNameFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Team Details</h2>
      
      <div className="space-y-2">
        <Label htmlFor="teamName">Team Name</Label>
        <Input
          id="teamName"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Choose a name that represents your team's identity and purpose.
        </p>
      </div>
    </div>
  );
}