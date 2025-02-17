import React, { useState } from 'react';
import { Box, CircularProgress, List, ListItem, ListItemText, Typography, Button, Divider } from '@mui/material';
import { useGetTransitionsQuery } from '../../../store/services/states';
import CreateTransitionModal from './CreateTransitionModal';

const TransitionsList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data: transitions, isLoading, error } = useGetTransitionsQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading transitions</Typography>;

  return (
    <Box mt={2}>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Create Transition
      </Button>

      {transitions && transitions?.count > 0 ? (
        <List>
          {transitions.results.map((transition, index) => (
            <>
              <ListItem key={transition.id}>
                <ListItemText
                  primary={`${transition.from_state?.name || 'Not started'} → ${transition.to_state.name}`}
                  secondary={transition.requires_signature ? 'Requires Signature' : 'No Signature'}
                />
              </ListItem>
              {index < transitions.results.length - 1 && <Divider />}

            </>
          ))}
        </List>

      ) : (
        <Typography>No transitions found.</Typography>
      )}
      <CreateTransitionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default TransitionsList;
