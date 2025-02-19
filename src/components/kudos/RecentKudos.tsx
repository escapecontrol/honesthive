import { useState } from "react";
import { Trophy, ChevronDown, MessageCircleOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FeedbackCard } from "@/components/FeedbackCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { EmptyState } from "../ui/empty-state";

interface KudoItem {
  avatar: string;
  name: string;
  message: string;
  date: Date;
  isStandout?: boolean;
  email: string;
}

interface RecentKudosProps {
  kudos: KudoItem[];
  onViewKudos: (name: string, email: string) => void;
}

export const RecentKudos = ({ kudos, onViewKudos }: RecentKudosProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return kudos.length > 0 ? (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Kudos</h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2 mt-4">
        {kudos.map((kudo, index) => (
          <div key={index} className="group relative">
            <div
              className="cursor-pointer"
              onClick={() => onViewKudos(kudo.name, kudo.email)}
            >
              <FeedbackCard
                avatar={kudo.avatar}
                name={kudo.name}
                message={kudo.message}
                date={kudo.date}
              />
            </div>
            {kudo.isStandout && (
              <Badge className="absolute -top-2 -right-2 px-2 py-1 bg-yellow-500 text-white border-none">
                <Trophy className="w-3 h-3 mr-1 inline" />
                Standout Member
              </Badge>
            )}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <div className="mt-4 pb-14">
      <EmptyState
        icon={MessageCircleOff}
        title="No kudos yet"
        description="Be the first to give kudos to your team members."
      />
    </div>
  );
};
