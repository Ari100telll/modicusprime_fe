import React from 'react';
import { Typography, Container, } from '@mui/material';
import StateGroupsList from '../../modules/states/components/StateGroupsList';


const StatePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        State Groups Management
      </Typography>

      <StateGroupsList />
    </Container>
  );
};
export default StatePage;
