import db from '..';
import { IItem, itemSchema } from './item';

export const Item = db.model<IItem>('Item', itemSchema);
