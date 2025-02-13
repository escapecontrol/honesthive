import { Card } from "@/components/ui/card";
import { Star, ThumbsUp, Trophy } from "lucide-react";

interface KudosStatsProps {
  onRecentKudosClick: () => void;
}

export const KudosStats = ({ onRecentKudosClick }: KudosStatsProps) => {
  const kudosStats = [
    {
      icon: Star,
      label: "My Total Kudos",
      value: "21",
      description: "All time kudos received",
    },
    {
      icon: Trophy,
      label: "Top Category",
      value: "Teamwork",
      description: "My strongest area",
    },
    {
      icon: ThumbsUp,
      label: "Recent Kudos",
      value: "5",
      description: "Received this month",
      onClick: onRecentKudosClick,
    },
  ];

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
      {kudosStats.map((stat, index) => (
        <Card 
          key={index} 
          className={`p-4 md:p-6 ${stat.onClick ? 'cursor-pointer hover:bg-secondary/80 transition-colors' : ''}`}
          onClick={stat.onClick}
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 md:p-3 bg-primary/10 rounded-full">
              <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              <h3 className="text-xl md:text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};