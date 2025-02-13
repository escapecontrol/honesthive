import { Building2, Users } from "lucide-react";

interface TeamTypeSelectorProps {
  selectedType: string | null;
  onSelect: (type: string) => void;
}

export function TeamTypeSelector({ selectedType, onSelect }: TeamTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Select Team Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect("family")}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedType === "family"
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <Users className="w-12 h-12" />
            <div className="text-center">
              <h3 className="font-semibold">Family</h3>
              <p className="text-sm text-muted-foreground">
                Create a team for your family members
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect("organisation")}
          className={`p-6 rounded-lg border-2 transition-all ${
            selectedType === "organisation"
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <Building2 className="w-12 h-12" />
            <div className="text-center">
              <h3 className="font-semibold">Organisation</h3>
              <p className="text-sm text-muted-foreground">
                Create a team for your company or organization
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}