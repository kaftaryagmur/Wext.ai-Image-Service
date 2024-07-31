//arama terimleri için Azure Blob Storage'dan fotoğraf URL'lerini alacak bir API
// sunucu taraflı
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// API Endpoint URL'inizi buraya girin
const API_URL = 'http://192.168.5.103:8000/api/getphotos/'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req.query;
    if (typeof query !== 'string') {
      return res.status(400).json({ error: 'Query must be a string' });
    }

    const response = await axios.get(API_URL, {
      params: { query },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching photos' });
  }
}
