import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`https://jobicy.com/api/v2/remote-jobs`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    const data = await response.json();

    res.json(data);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: error.message });
  }
});

export { router as postingRouter };
