import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, ListItemIcon } from '@mui/material';

export interface Item {
  id: string;
  name: string;
  description?: string;
  complete: boolean;
};

export default function Todo(
  {
    item: { id, name, complete, description }, setComplete, deleteItem
  }: {
    item: Item,
    setComplete: (value: boolean) => void,
    deleteItem: () => void,
  }
) {
  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={deleteItem}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={() => setComplete(!complete)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={complete}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': name }}
          />
        </ListItemIcon>
        <ListItemText 
          id={id}
          primary={name}
          secondary={description}
        />
      </ListItemButton>
    </ListItem>
  );
}
