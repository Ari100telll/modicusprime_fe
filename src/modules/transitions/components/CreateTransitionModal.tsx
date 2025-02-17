import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useGetStatesQuery, useCreateTransitionMutation } from '../../../store/services/states';

interface CreateTransitionModalProps {
  open: boolean;
  onClose: () => void;
}

const NOT_STARTED_VALUE = 'not_started_value'

const CreateTransitionModal: React.FC<CreateTransitionModalProps> = ({ open, onClose }) => {
  const { data: states } = useGetStatesQuery();
  const [fromState, setFromState] = useState('');
  const [toState, setToState] = useState('');
  const [requiresSignature, setRequiresSignature] = useState(false);

  const [createTransition, { isLoading: isCreating }] = useCreateTransitionMutation();

  const handleSave = async () => {
    if (!fromState || !toState || fromState === toState) return;

    try {
      await createTransition({
        from_state: fromState === NOT_STARTED_VALUE ? null : fromState,
        to_state: toState,
        requires_signature: requiresSignature,
      }).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to create transition:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create Transition</DialogTitle>
      <DialogContent>
        <Select
          value={fromState}
          onChange={(e) => setFromState(e.target.value)}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select From State
          </MenuItem>
          <MenuItem value={NOT_STARTED_VALUE}>
            Not Started
          </MenuItem>
          {states?.results.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={toState}
          onChange={(e) => setToState(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mt: 2 }}
        >
          <MenuItem value="" disabled>
            Select To State
          </MenuItem>
          {states?.results.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          control={
            <Checkbox
              checked={requiresSignature}
              onChange={(e) => setRequiresSignature(e.target.checked)}
            />
          }
          label="Requires Signature"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isCreating}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={isCreating || !fromState || !toState || fromState === toState}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTransitionModal;
