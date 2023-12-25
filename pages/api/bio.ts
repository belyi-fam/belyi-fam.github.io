import { NextApiRequest, NextApiResponse } from 'next';
import { getBio } from '@/data/bio';
import { Bio, Member } from '@/common/types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Parse the incoming JSON data
      const data: string[] = req.body['names'];
      console.log(`Called /api/bio with: ${data}`);

      // Create a Bio object based on the data (customize this as needed)
      const bio: Bio = getBio(data as Member[]);

      // Send the Bio object as a JSON response
      res.status(200).json(bio);
    } catch (error) {
      // Handle any errors here
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('returned');
};
