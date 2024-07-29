import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Django backend URL'i
const DJANGO_LOGIN_URL = 'http://192.168.5.101:8000/login/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Django API'sine istek gönder
      const response = await axios.post(DJANGO_LOGIN_URL, req.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Django'dan gelen yanıtı frontend'e ilet
      res.status(200).json(response.data);
    } catch (error: any) {
      // Hata durumunda yanıt ver
      const message = error.response?.data?.message || 'Internal Server Error';
      res.status(error.response?.status || 500).json({ message });
    }
  } else {
    // Sadece POST yöntemine izin ver
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
