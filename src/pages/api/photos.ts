import axios from 'axios';
export const fetchPhotos = async (query: string): Promise<{ [key: string]: string[] }> => {
  const token = localStorage.getItem('token'); // Token'ı localStorage'dan alın

  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.get('/api/getphotos/', {
    params: { query },
    headers: {
      'Authorization': `Bearer ${token}`, // Yetkilendirme başlığını ekleyin
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch photos');
  }

  return response.data;
};