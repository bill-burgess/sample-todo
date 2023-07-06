import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function NewTodo({
  open,
  setOpen,
  addItem,
  loading,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  addItem: (value: { name: string; description: string }) => void;
  loading: boolean;
}) {
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await addItem({ name, description });
      setOpen(false);
      setName('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="description"
          label="Description (Optional)"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleSave}
        >
          Save
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
      </DialogActions>
    </Dialog>
  );
}
