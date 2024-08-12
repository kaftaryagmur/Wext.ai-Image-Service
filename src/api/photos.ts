//front-end ile back-end arasında veri alışverişi sağlar
import axios from "axios";
export const fetchPhotos = async (query: string, p0: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `http://20.52.97.229:8000/api/getphotos/`, // Endpoint URL'sini buraya yazın
      {
        params: {
          search: query,
        },
      }
    );
    return response.data; // Sunucudan dönen fotoğraf URL'lerini döndürün
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw new Error("Unable to fetch photos.");
  }
};
