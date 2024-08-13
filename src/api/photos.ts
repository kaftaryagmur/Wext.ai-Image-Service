import axios from "axios";

//front-end ile back-end arasında veri alışverişi sağlar
export const fetchPhotos = async (query: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getphotos/`, // Endpoint URL'sini .env dosyasından alıyoruz
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
