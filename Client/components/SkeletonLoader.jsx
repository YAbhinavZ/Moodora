// Shown while Gemini + YouTube API calls are in progress

const SkeletonLoader = () => {
    return (
      <div className="w-full flex flex-col gap-3 animate-pulse">
        {/* Player skeleton */}
        <div className="w-full aspect-video bg-gray-800 rounded-xl" />
  
        {/* Song card skeletons */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
            <div className="w-16 h-16 bg-gray-700 rounded-lg shrink-0" />
            <div className="flex flex-col gap-2 flex-1 justify-center">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
              <div className="h-3 bg-gray-700 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SkeletonLoader;