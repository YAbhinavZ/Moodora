import axiosInstance from "./axios";

// Save a playlist after mood analysis
export const savePlaylist = async (data) => {
  const response = await axiosInstance.post("/playlists", data);
  return response.data;
};

// Get all playlists for logged in user
export const getPlaylists = async () => {
  const response = await axiosInstance.get("/playlists");
  return response.data;
};

// Rate a song inside a playlist
export const rateSong = async (playlistId, songId, rating) => {
  const response = await axiosInstance.patch(`/playlists/${playlistId}/rate`, {
    songId,
    rating,
  });
  return response.data;
};

// Delete a playlist
export const deletePlaylist = async (playlistId) => {
  const response = await axiosInstance.delete(`/playlists/${playlistId}`);
  return response.data;
};