/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { deletePick } from 'src/services/PicksService';
import { useSnackbar } from 'notistack';
import {
  Box,
  Card,
  Divider,
  IconButton,
  makeStyles,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@material-ui/core';
import {
  Trash2 as DeleteIcon,

} from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: 50
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  imageList: {
    width: '100%',
    height: 600,
    // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

function Results({
  className,
  Picks,
  updatePicks,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />
      <PerfectScrollbar>
        <Box minHeight={700} minWidth={700}>
          <div className={classes.imageContainer}>
            <ImageList rowHeight={300} gap={1} className={classes.imageList}>
              {Picks.map((item) => (
                <ImageListItem key={item.id} cols={item.id % 3 === 0 ? 2 : 1} rows={item.id % 3 === 0 ? 2 : 1}>
                  <img src={item.thumbnail} alt={item.title} />
                  <ImageListItemBar
                    title={item.title}
                    position="top"
                    actionIcon={
                      <IconButton 
                      onClick={() => {
                        deletePick(item)
                          .then(res => {
                            if(res){
                              enqueueSnackbar('Picture Deleted Successfully', {
                                variant: 'success'
                              });
                              updatePicks(res)
                            }else{
                              enqueueSnackbar('Picture could not be deleted rigth now.', {
                                variant: 'error'
                              });
                            }
                          })
                          .catch(err => {
                            enqueueSnackbar('Picture could not be deleted rigth now.', {
                              variant: 'error'
                            });
                            console.log('ERR: ', err)
                          });
                      }}
                      aria-label={`delete ${item.title}`}
                      className={classes.icon}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>

          {/* <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Article Heading</TableCell>
                <TableCell>Article Discription</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Articles.map(article => {
                return (
                  <TableRow hover>
                    <TableCell><Avatar alt="Remy Sharp" style={{width: 100, height: 100}} src={article?.image} /></TableCell>
                    <TableCell>{article?.heading}</TableCell>
                    <TableCell>{article?.discription}</TableCell>
                    <TableCell>{article?.createdAt}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          deleteArticle(article?.id)
                            .then(res => {
                              if(res){
                                enqueueSnackbar('Article Deleted Successfully', {
                                  variant: 'success'
                                });
                                updateArticles(res)
                              }else{
                                enqueueSnackbar('Article could not be deleted rigth now.', {
                                  variant: 'error'
                                });
                              }
                            })
                            .catch(err => {
                              enqueueSnackbar('Article could not be deleted rigth now.', {
                                variant: 'error'
                              });
                              console.log('ERR: ', err)
                            });
                        }}
                      >
                        <SvgIcon fontSize="small">
                          <DeleteIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table> */}
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={filteredCustomers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};

Results.defaultProps = {
  customers: []
};

export default Results;
