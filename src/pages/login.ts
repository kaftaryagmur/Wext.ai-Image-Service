import type { NextApiRequest, NextApiResponse } from 'next';

// Bu örnekte bir kullanıcı verisi sabit olarak tanımlanmıştır
const mockUser = {
  email: 'user@example.com',
  password: 'password123', // Gerçek uygulamalarda şifreler hashlenmiş olmalıdır
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email === mockUser.email && password === mockUser.password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid Username or Password!' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
