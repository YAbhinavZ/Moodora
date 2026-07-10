// Displays a single song with thumbnail, title, artist, reason and star rating

const SongCard = ({ song, isActive, onClick, onRate }) => {
    const handleRate = (e, rating) => {
      e.stopPropagation(); // don't trigger onClick when rating
      onRate(song._id, rating);
    };
  
    return (
      <div
        onClick={onClick}
        className={`flex gap-4 p-4 rounded-xl cursor-pointer transition border ${
          isActive
            ? "border-purple-500 bg-purple-900/30"
            : "border-gray-700 bg-gray-800 hover:border-gray-500"
        }`}
      >
        {/* Thumbnail */}
        {song.thumbnail ? (
          <img
            src={song.thumbnail}
            alt={song.title}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center shrink-0">
            <span className="text-2xl">🎵</span>
          </div>
        )}
  
        {/* Info */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <p className="text-white font-medium truncate">{song.title}</p>
            <p className="text-gray-400 text-sm truncate">{song.artist}</p>
            {song.reason && (
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{song.reason}</p>
            )}
          </div>
  
          {/* Star Rating */}
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={(e) => handleRate(e, star)}
                className={`text-lg transition ${
                  star <= (song.rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-600 hover:text-yellow-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SongCard;