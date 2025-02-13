import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface FeedbackCardProps {
  avatar: string;
  name: string;
  message: string;
  date: Date;
}

export const FeedbackCard = ({ 
  avatar, 
  name, 
  message, 
  date,
}: FeedbackCardProps) => {
  return (
    <Card className="p-6 card-hover animate-fade-up">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{name}</h3>
          </div>
          <p className="mt-2 text-muted-foreground">{message}</p>
          <span className="text-sm text-muted-foreground mt-2 block">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
        </div>
      </div>
    </Card>
  );
};