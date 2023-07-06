import { Request, Response } from 'express';
import { Item } from '../../db/schema';

export default async function deleteItem(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
}
