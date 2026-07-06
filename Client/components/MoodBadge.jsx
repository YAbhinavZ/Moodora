// Color map based on mood label
const moodColors = {
    happy: "bg-yellow-500",
    excited: "bg-orange-500",
    calm: "bg-blue-500",
    sad: "bg-indigo-500",
    anxious: "bg-purple-500",
    angry: "bg-red-500",
    melancholic: "bg-violet-600",
    default: "bg-gray-500",
  };
  
  const MoodBadge = ({ moodLabel, energy }) => {
    const color = moodColors[moodLabel?.toLowerCase()] || moodColors.default;
  
    return (
      <div className="flex items-center gap-3">
        <span className={`${color} text-white text-sm font-semibold px-4 py-1.5 rounded-full capitalize`}>
          {moodLabel}
        </span>
        <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-full capitalize">
          ⚡ {energy} energy
        </span>
      </div>
    );
  };
  
  export default MoodBadge;