import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { useCreateStateMutation } from '../../../store/services/states';

interface CreateStateModalProps {
  open: boolean;
  onClose: () => void;
  groupId: string;
}

const CreateStateModal: React.FC<CreateStateModalProps> = ({
  open,
  onClose,
  groupId
}) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');

  const [createState, { isLoading }] = useCreateStateMutation();

  const handleSave = async () => {
    if (!name.trim() || !key.trim()) return;
    try {
      await createState({
        name,
        key,
        description,
        group: groupId
      }).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to create state:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create State</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Key"
          fullWidth
          margin="dense"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disabled={isLoading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStateModal;
