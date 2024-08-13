//front-end ile back-end arasında veri alışverişi sağlar
import axios from "axios";
export const fetchPhotos = async (query: string, p0: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `https://wextaiblob.germanywestcentral.cloudapp.azure.com/api/getphotos/`, // Endpoint URL'sini buraya yazın
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
