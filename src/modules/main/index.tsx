import React, {FC} from 'react'
import {Box} from "@mui/material";
import {useGetUsersListQuery} from "../../store/services/main";
import LoginForm from "./components/LoginForm";

const MainPage: FC = () => {
  const {data: users} = useGetUsersListQuery()

  return (
    <Box>
      <LoginForm/>
      {users?.results.map((user) => (
        <Box key={user.id}>
          {user.username}
        </Box>
      ))}
    </Box>
  )
}

export default MainPage