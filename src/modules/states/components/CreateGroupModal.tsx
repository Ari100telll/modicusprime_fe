import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {useCreateStateGroupMutation} from '../../../store/services/states';

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({open, onClose}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [createGroup, {isLoading}] = useCreateStateGroupMutation();

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      await createGroup({
        name,
        description
      }).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to create group:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create State Group</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default CreateGroupModal;
