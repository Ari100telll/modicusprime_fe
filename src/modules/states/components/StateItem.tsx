import React from 'react';
import {Box, Typography} from '@mui/material';
import {IStateItem} from "../../../store/services/states/types";

interface StateItemProps {
  state: IStateItem;
}

const StateItem: React.FC<StateItemProps> = ({state}) => {
  return (
    <Box
      border="1px solid #ccc"
      borderRadius={2}
      p={2}
      mt={2}
    >
      <Typography variant="h6">{state.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        Key: {state.key || 'No key'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Description: {state.description || 'No description'}
      </Typography>
    </Box>
  );
};

export default StateItem;