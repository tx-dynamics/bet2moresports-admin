import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import { getArticles } from 'src/services/ArticleService';


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
  const [Articles, setArticles] = useState([]);

  const getArts = useCallback(async () => {
    const articles = await getArticles();
    // console.log(articles)
    setArticles(articles)
  }, []);

  const updateArticles = (articles) => {
    setArticles(articles)
  }

  useEffect(() => {
    getArts();
  }, [getArts]);

  if (!Articles) {
    return null;
  }

  return (
    <Page className={classes.root} title="Vet2Chance - Articles">
      <Container maxWidth={false}>
        <Header />
        {Articles && (
          <Box mt={3}>
            <Results Articles={Articles} updateArticles={updateArticles}/>
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default MeditationListView;
