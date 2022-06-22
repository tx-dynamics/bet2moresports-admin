import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import { getPodcasts } from 'src/services/PodcastService';


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
  const [Podcasts, setPodcasts] = useState([]);

  const getPods = useCallback(async () => {
    const podcasts = await getPodcasts();
    // console.log(picks)
    setPodcasts(podcasts)
  }, []);

  const updatePodcasts = (podcasts) => {
    setPodcasts(podcasts)
  }

  useEffect(() => {
    getPods();
  }, [getPods]);

  if (!Podcasts) {
    return null;
  }

  return (
    <Page className={classes.root} title="Vet2Chance - Podcasts">
      <Container maxWidth={false}>
        <Header />
        {Podcasts && (
          <Box mt={3}>
            <Results Podcasts={Podcasts} updatePodcasts={updatePodcasts}/>
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default MeditationListView;
