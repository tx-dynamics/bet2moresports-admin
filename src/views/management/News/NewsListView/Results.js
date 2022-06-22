/* eslint-disable max-len */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {deleteArticle, updateArticle} from 'src/services/ArticleService';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Avatar,
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
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  FormHelperText,
  Button,
  TextField
} from '@material-ui/core';
import {
  Edit2 as EditIcon,
  Trash2 as DeleteIcon,

} from 'react-feather';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3, 4),
    color: theme.palette.text.primary,
    width: '600px',
    overflow: 'hidden'
  },
  input: {
    display: 'none',
  },
}));

function Results({
  className,
  Articles,
  updateArticles,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [editArticle, setEditArticle] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)
  const [open, setOpen] = React.useState(false);

  const handleOpen = (article) => {
    setEditArticle(article)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Article Author</TableCell>
                <TableCell>Article Heading</TableCell>
                <TableCell>Article Discription</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Articles.map(article => {
                return (
                  <TableRow hover>
                    <TableCell><Avatar alt="Remy Sharp" style={{width: 100, height: 100}} src={article?.image} /></TableCell>
                    <TableCell>{article?.author}</TableCell>
                    <TableCell>{article?.heading}</TableCell>
                    <TableCell>{article?.discription}</TableCell>
                    <TableCell>{article?.createdAt}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => {handleOpen(article)}}>
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          deleteArticle(article)
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
          </Table>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
              <Formik
                  initialValues={{
                    author: editArticle?.author,
                    heading: editArticle?.heading,
                    discription: editArticle?.discription,
                  }}
                  validationSchema={Yup.object().shape({
                    author: Yup.string().required(),
                    heading: Yup.string().required(),
                    discription: Yup.string().required(),
                  })}
                  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                      // Do api call
                      if(imageUpload || editArticle.heading !== values.heading || editArticle.discription !== values.discription){
                        setSubmitting(true);
                        const res = await updateArticle(editArticle, imageUpload, values)
                        if(res){
                          enqueueSnackbar('New Changes Saved', {
                            variant: 'success'
                          });
                          updateArticles(res)
                          handleClose()
                        }else{
                          enqueueSnackbar('Error While Saving Changes', {
                            variant: 'error'
                          });
                        }
                      }else{
                        enqueueSnackbar('No changes detected', {
                          variant: 'error'
                        });
                      }
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className={clsx(classes.root, className)}
                      {...rest}
                    >
                      <div>
                        <input onChange={(event) => { setImageUpload(event.target.files[0])}} name="articleImage" accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                          {(imageUpload && imageUpload.name) || editArticle?.image}
                        </label>
                        <Box mt={3} mb={1}>
                          <TextField
                            error={Boolean(
                              touched.author && errors.author
                            )}
                            helperText={touched.author && errors.author}
                            fullWidth
                            label="Article Author"
                            name="author"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.author}
                            variant="outlined"
                          />
                        </Box>
                        <Box mt={3} mb={1}>
                          <TextField
                            error={Boolean(
                              touched.heading && errors.heading
                            )}
                            helperText={touched.heading && errors.heading}
                            fullWidth
                            label="Article Heading"
                            name="heading"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.heading}
                            variant="outlined"
                          />
                        </Box>

                        <Box mt={3} mb={1}>
                          <TextField
                            error={Boolean(
                              touched.discription && errors.discription
                            )}
                            helperText={
                              touched.discription && errors.discription
                            }
                            fullWidth
                            label="Article Discription"
                            name="discription"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.discription}
                            variant="outlined"
                            multiline
                            rows={6}
                          />
                        </Box>
                      </div>
                      {errors.submit && (
                        <Box mt={3}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                      )}
                      <Box style={{display: 'flex', justifyContent: 'center'}} mt={2}>
                        <Button
                          color="secondary"
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Save
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </div>
            </Fade>
          </Modal>
        </Box>
      </PerfectScrollbar>
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
