// Embeds a YouTube video by videoId
// Accepts: videoId, title, onNext, onPrev, hasNext, hasPrev

const YouTubePlayer = ({ videoId, title, onNext, onPrev, hasNext, hasPrev }) => {
    if (!videoId) {
      return (
        <div className="w-full aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
          <p className="text-gray-500">Select a song to play</p>
        </div>
      );
    }
  
    return (
      <div className="w-full">
        {/* YouTube iframe */}
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            key={videoId} // re-mount iframe when videoId changes
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
  
        {/* Prev / Next controls */}
        <div className="flex justify-between items-center mt-3 px-1">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ⬅ Previous
          </button>
  
          <p className="text-gray-400 text-sm truncate max-w-xs text-center">
            {title}
          </p>
  
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    );
  };
  
  export default YouTubePlayer;