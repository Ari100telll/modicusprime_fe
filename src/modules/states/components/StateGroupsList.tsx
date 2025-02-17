import React, {useState} from 'react';
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import {useGetStateGroupsQuery} from '../../../store/services/states';
import CreateGroupModal from './CreateGroupModal';
import StateGroupItem from './StateGroupItem';

const StateGroupsList: React.FC = () => {
  const {data: groups, error, isLoading, refetch} = useGetStateGroupsQuery();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  if (isLoading) return <CircularProgress/>;
  if (error) return <Typography color="error">Error loading groups</Typography>;

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => setOpenCreateModal(true)}
      >
        Create Group
      </Button>

      <CreateGroupModal
        open={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
          refetch();
        }}
      />

      <Box mt={2}>
        {groups && groups?.count > 0 ? (
          groups.results.map((group) => (
            <StateGroupItem
              key={group.id}
              group={group}
              onRefetch={refetch}
            />
          ))
        ) : (
          <Typography>No groups found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default StateGroupsList;
