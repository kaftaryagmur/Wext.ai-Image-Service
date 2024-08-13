import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://wextaiblob.germanywestcentral.cloudapp.azure.com/api/getphotos/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req.query;
    if (typeof query !== 'string') {
      return res.status(400).json({ error: 'Query must be a string' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token); // Hata ayıklama için token'ı loglayın

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await axios.get(API_URL, {
      params: { query },
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching photos:', error); // Hata ayıklama için loglayın
    res.status(500).json({ error: 'An error occurred while fetching photos' });
  }
}
