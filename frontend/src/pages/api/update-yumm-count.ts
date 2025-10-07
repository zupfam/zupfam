import type { NextApiRequest, NextApiResponse } from 'next';
import { updateYummCount } from '../../services/google-sheets';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { dishName, newCount, vendorId } = req.body;

    if (!dishName || !newCount || !vendorId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
      await updateYummCount(dishName, newCount, vendorId);
      res.status(200).json({ message: 'Yumm count updated successfully' });
    } catch (error) {
      console.error('Failed to update yumm count:', error);
      res.status(500).json({ message: 'Failed to update yumm count' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}