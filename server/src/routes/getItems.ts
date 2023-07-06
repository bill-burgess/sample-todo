import { Request, Response } from 'express';

import { Item } from '../../db/schema';

export default async function getItems(req: Request, res: Response) {
  await Item.find({})
    .then((items) => {
      res
        .status(200)
        .json(
          items.map(({ _id, name, description, complete }) => ({ _id, name, description, complete }))
        );
    })
    .catch((error) => {
      console.error('Error retrieving items:', error);
      return res.status(500).send('Error retrieving data.');
    });
}