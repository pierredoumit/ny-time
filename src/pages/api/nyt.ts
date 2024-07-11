import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { period, id } = req.query;
  const apiKey = process.env.NYT_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: 'API key is missing' });
    return;
  }

  if (!period) {
    res.status(400).json({ error: 'Period is required' });
    return;
  }

  const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const article = response.data.results.find((a: any) => a.id === parseInt(id as string));
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: 'Article not found' });
      }
    } else {
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
