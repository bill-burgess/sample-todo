import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import TodoItem from './todo-item';
import NewTodo from './new-todo';

interface Item {
  id: string;
  name: string;
  description?: string;
  complete: boolean;
}

export default function TodoList() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [newOpen, setNewOpen] = React.useState<boolean>(false);
  const [newLoading, setNewLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };

  const updateItem = async (value: boolean, itemId: string) => {
    const previousItemState = { ...items }
    try {
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          return { ...item, complete: value };
        }
        return item;
      });
      setItems(updatedItems);
      await fetch(`/api/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete: value }),
      });
    } catch (error) {
      console.log('Error updating item:', error);
      setItems(previousItemState);
    }
  };

  const deleteItem = async (itemId: string) => {
    const previousItemState = { ...items }
    try {
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
      await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log('Error deleting item:', error);
      setItems(previousItemState);
    }
  };

  const addItem = async ({ name, description }: { name: string; description: string }): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setNewLoading(true);
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, complete: false }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add item');
          }
          return response.json();
        })
        .then((newItem) => {
          setItems([...items, newItem]);
          setNewLoading(false);
          setNewOpen(false);
          resolve();
        })
        .catch((error) => {
          console.log('Error adding item:', error);
          setNewLoading(false);
          reject(error);
        });
    });
  };

  const clearCompleted = async () => {
    try {
      await Promise.all(
        items
          .filter((item) => item.complete)
          .map(async (item) => {
            await fetch(`/api/items/${item.id}`, {
              method: 'DELETE',
            });
          })
      );
      const updatedItems = items.filter((item) => !item.complete);
      setItems(updatedItems);
    } catch (error) {
      console.log('Error clearing completed items:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f1f1f1',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          minHeight: 600,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: '0px 2px 4pxrgba(0, 0, 0, 0.2)',
          background: '#f9f9f9',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <List>
          {Object.keys(items).length ? (
            items.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                setComplete={(value: boolean) => updateItem(value, item.id)}
                deleteItem={() => deleteItem(item.id)}
              />
            ))
          ) : (
            <div>
              Nothing left to be done!{' '}
              <span role="img" aria-label="emoji">
                🎉
              </span>
            </div>
          )}
        </List>
        <div>
          <Divider style={{ marginBottom: 16 }} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setNewOpen(true)}
          >
            New Item
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteSweepIcon />}
            onClick={clearCompleted}
            disabled={!items.length}
            style={{ marginLeft: 16 }}
          >
            Clear Completed
          </Button>
        </div>
      </Box>
      <NewTodo open={newOpen} setOpen={setNewOpen} addItem={addItem} loading={newLoading} />
    </div>
  );
}
