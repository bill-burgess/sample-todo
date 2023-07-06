import { Request, Response } from 'express';
import { Item } from '../../db/schema';

export default async function updateItem(req: Request, res: Response) {
  const { id } = req.params;
  const { name, description, complete } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, description, complete },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
}