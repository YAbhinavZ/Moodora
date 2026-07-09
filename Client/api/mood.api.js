import axiosInstance from "./axios";

// Send mood text to backend → get moodLabel + songs[]
export const analyseMood = async (text) => {
  const response = await axiosInstance.post("/mood/analyse", { text });
  return response.data;
};