import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
// import axios from 'src/utils/axios';
import Page from 'src/components/Page';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';
// import CategoryService from 'src/services/CategoryService';
import MeditationService from 'src/services/MeditationService';

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
  // const isMountedRef = useIsMountedRef();
  const [customers, setCustomers] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [meditationTracks, setMeditationTracks] = useState(null);
  // const [query, setQuery] = useState('All');
  const getCustomers = useCallback(() => {
    MeditationService.getAllArticles().then(res => {
      console.log('RES: ', res);
      setCustomers(res.articles);
    });
    // CategoryService.getSingleTrackCategory('Meditation').then(res => {
    //   console.log('RES: ', res);
    //   setCategories(res);
    // });
  }, []);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  // useEffect(() => {
  //   if (query && query !== 'All') {
  //     console.log('QUERY: ', query);
  //     MeditationService.queryRecords({
  //       query: {
  //         filters: [],
  //         search: query,
  //         page: 0,
  //         pageSize: 20,
  //         orderDirection: '',
  //         totalCount: 10
  //       }
  //     }).then(res => {
  //       console.log('RES: ', res);
  //       setCustomers(res);
  //     });
  //   }
  // }, [query]);

  if (!customers) {
    return null;
  }

  return (
    <Page className={classes.root} title="4Relax - Articles">
      <Container maxWidth={false}>
        <Header />
        {customers && (
          <Box mt={3}>
            <Results
              customers={customers}
              getArticles={getCustomers}
            // categories={categories}
            // setQuery={setQuery}
            // query={query}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default MeditationListView;
