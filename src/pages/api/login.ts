// src/pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Django backend URL'i
const DJANGO_LOGIN_URL = 'http://localhost:8000/login/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(DJANGO_LOGIN_URL, req.body);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(401).json({ message: 'Invalid Username or Password!' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
