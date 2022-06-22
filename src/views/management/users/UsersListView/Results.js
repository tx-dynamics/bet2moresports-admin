/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {deleteUser, userBlocking} from 'src/services/UserService';

import {
  Box,
  Card,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import {
  Trash2 as DeleteIcon,
  UserMinus as BlockIcon,
  UserPlus as UnBlockIcon,
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
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({ className, users, updateUser, ...rest }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />

      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <Box flexGrow={1} />
      </Box>

      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>User Blocked</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users.map(user => <TableRow>
                  <TableCell>{user?.fullName}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell align="left">
                    <Tooltip title={user?.userBlocked ? 'Unblock User' : 'Block User'} placement="top">
                      <IconButton onClick={async () => {
                        try{
                          if(user.userBlocked === undefined || user.userBlocked === false){
                            const users = await userBlocking(false, user?.id)
                            if(users){
                              enqueueSnackbar('User Blocked Successfully', {
                                variant: 'success'
                              });
                              console.log(users)
                              updateUser(users)
                            }else{
                              enqueueSnackbar('Error occurred while blocking user.', {
                                variant: 'error'
                              });
                            }

                          }else{
                            const users = await userBlocking(true, user?.id)
                            if(users){
                              enqueueSnackbar('User Unblocked Successfully', {
                                variant: 'success'
                              });
                              console.log(users)
                              updateUser(users)
                            }else{
                              enqueueSnackbar('Error occurred while unblocking user.', {
                                variant: 'error'
                              });
                            }
                          }
                        }catch(err) {
                          enqueueSnackbar('Error occurred while unblocking user.', {
                            variant: 'error'
                          });
                          console.log(err)
                        }
                      }}>
                        <SvgIcon fontSize="small">
                          {
                            user?.userBlocked ? <BlockIcon /> : <UnBlockIcon />
                          }
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title='Delete User' placement="top">
                      <IconButton onClick={ async () => {
                        try{
                          const users = await deleteUser(user?.id)
                          if(users){
                            enqueueSnackbar('User Deleted Successfully', {
                              variant: 'success'
                            });
                            console.log(users)
                            updateUser(users)
                          }else{
                            enqueueSnackbar('Error occurred while deleting user.', {
                              variant: 'error'
                            });
                          }
                        }catch(err) {
                          enqueueSnackbar('Error occurred while deleting user.', {
                            variant: 'error'
                          });
                          console.log(err)
                        }
                      }}>
                        <SvgIcon fontSize="small">
                          <DeleteIcon />
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                )
              }
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card >
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
