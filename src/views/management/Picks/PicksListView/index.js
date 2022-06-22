import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import { getPicks } from 'src/services/PicksService';


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
  const [Picks, setPicks] = useState([]);

  const getPictures = useCallback(async () => {
    const picks = await getPicks();
    // console.log(picks)
    setPicks(picks)
  }, []);

  const updatePicks = (picks) => {
    setPicks(picks)
  }

  useEffect(() => {
    getPictures();
  }, [getPictures]);

  if (!Picks) {
    return null;
  }

  return (
    <Page className={classes.root} title="Vet2Chance - Pictures">
      <Container maxWidth={false}>
        <Header />
        {Picks && (
          <Box mt={3}>
            <Results Picks={Picks} updatePicks={updatePicks}/>
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default MeditationListView;
