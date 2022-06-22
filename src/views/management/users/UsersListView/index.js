import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import {getUsers} from 'src/services/UserService';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function MeditationListView() {
  const classes = useStyles();
  const [users, setUsers] = useState(null);

  const getCustomers = useCallback(async () => {
    const users = await getUsers()
    console.log(users)
    setUsers(users)
  }, []);

  const updateUser = (users) => {
    // console.log('users updates', users);
    setUsers(users)
  }

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!users) {
    return null;
  }

  return (
    <Page className={classes.root} title="MakingMedia - Users">
      <Container maxWidth={false}>
        <Header />
        {users && (
          <Box mt={3}>
            <Results users={users} updateUser={updateUser} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default MeditationListView;
