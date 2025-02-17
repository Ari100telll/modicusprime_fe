import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useGetStatesQuery} from '../../../store/services/states';
import CreateStateModal from './CreateStateModal';
import {IStateGroup} from "../../../store/services/states/types";
import StateItem from "./StateItem";

interface StateGroupItemProps {
  group: IStateGroup;
  onRefetch: () => void;
}

const StateGroupItem: React.FC<StateGroupItemProps> = ({group, onRefetch}) => {
  const {data: states} = useGetStatesQuery(group.id);

  const [openStateModal, setOpenStateModal] = useState(false);

  return (
    <Box
      border="1px solid #ccc"
      borderRadius={2}
      p={2}
      mt={2}
    >
      <Typography variant="h6">{group.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        Description: {group.description || 'No description'}
      </Typography>

      <Box mt={2}>
        <Button
          variant="outlined"
          onClick={() => setOpenStateModal(true)}
        >
          Create State
        </Button>
      </Box>

      <Box mt={2}>
        {states && states.count > 0 ? (
          states.results.map((state) => (
            <StateItem
              key={state.id}
              state={state}
            />
          ))
        ) : null}
      </Box>

      <CreateStateModal
        open={openStateModal}
        onClose={() => {
          setOpenStateModal(false);
          onRefetch();
        }}
        groupId={group.id}
      />
    </Box>
  );
};

export default StateGroupItem;