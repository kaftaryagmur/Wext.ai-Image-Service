import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Django backend URL'i
const DJANGO_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // API istek
      const response = await axios.post(DJANGO_LOGIN_URL, req.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      res.status(200).json(response.data);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Internal Server Error';
      res.status(error.response?.status || 500).json({ message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
