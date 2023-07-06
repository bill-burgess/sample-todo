import { Request, Response } from 'express';
import { Item } from '../../db/schema';

export default async function createItem(req: Request, res: Response) {
  const { name, description, complete } = req.body;

  try {
    const newItem = await Item.create({ name, description, complete });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save item' });
  }
}