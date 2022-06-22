import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Result from './Result';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function MeditationCreateView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="MakingMedia - Picks">
      <Container maxWidth={false}>
        <Header />
        <Result />
      </Container>
    </Page>
  );
}

export default MeditationCreateView;
