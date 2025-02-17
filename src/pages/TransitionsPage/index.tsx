import React from 'react';
import { Container, Typography } from '@mui/material';
import TransitionsList from '../../modules/transitions/components/TransitionsList';


const TransitionsPage: React.FC = () => {

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        State Transitions
      </Typography>
      <TransitionsList />
    </Container>
  );
};

export default TransitionsPage;
