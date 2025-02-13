import { FeedbackCard } from "@/components/FeedbackCard";

interface FeedbackItem {
  avatar: string;
  name: string;
  message: string;
  date: Date;
}

interface RecentFeedbackProps {
  feedback: FeedbackItem[];
  reference: React.RefObject<HTMLDivElement>;
}

export const RecentFeedback = ({ feedback, reference }: RecentFeedbackProps) => {
  return (
    <div className="space-y-4" ref={reference}>
      <h2 className="text-xl md:text-2xl font-bold">Recent Feedback</h2>
      <div className="grid gap-4 grid-cols-1">
        {feedback.map((item, index) => (
          <FeedbackCard
            key={index}
            avatar={item.avatar}
            name={item.name}
            message={item.message}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};