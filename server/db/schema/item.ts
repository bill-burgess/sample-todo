import { Schema, Document } from 'mongoose';

export interface Item {
  name: string;
  description?: string;
  complete: boolean;
}

export interface IItem extends Item, Document {}

export const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  complete: { type: Boolean, required: true },
});
