interface GrowthCategoriesProps {
  teamType: "family" | "organisation";
}

const familyCategories = [
  { name: "Communication", description: "Foster open and honest dialogue" },
  { name: "Support", description: "Emotional and practical family support" },
  { name: "Traditions", description: "Building and maintaining family traditions" },
  { name: "Growth", description: "Personal development and learning" },
];

const organisationCategories = [
  { name: "Leadership", description: "Effective team leadership and management" },
  { name: "Innovation", description: "Creative problem-solving and new ideas" },
  { name: "Collaboration", description: "Team cooperation and synergy" },
  { name: "Performance", description: "Goal achievement and productivity" },
];

export function GrowthCategories({ teamType }: GrowthCategoriesProps) {
  const categories = teamType === "family" ? familyCategories : organisationCategories;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Growth Categories</h2>
      <p className="text-muted-foreground mb-6">
        {teamType === "family" 
          ? "These categories will help track and measure growth for each family member."
          : "These categories will help track and measure growth for each organisation team member."}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="p-6 rounded-lg border bg-white transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="font-semibold text-lg mb-2 text-lime-500">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}