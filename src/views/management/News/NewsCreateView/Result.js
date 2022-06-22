import React,{useState} from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  TextField,
  makeStyles,
  IconButton
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { addArticle } from 'src/services/ArticleService';

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  },
  input: {
    display: 'none',
  },
}));


function Result({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const [imageUpload, setImageUpload] = useState(null)
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        author: '',
        heading: '',
        discription: '',
      }}
      validationSchema={Yup.object().shape({
        heading: Yup.string().required(),
        discription: Yup.string().required(),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Do api call
          if (imageUpload === null) {
            enqueueSnackbar('Please upload article image', {variant: 'error'})
          }else{
            setSubmitting(true);
            const res = await addArticle(imageUpload, values)
            if(res){
              enqueueSnackbar('New Article Published', {
                variant: 'success'
              });
              history.push('/app/management/news-articles');
            }else{
              enqueueSnackbar('Error While Publishing New Article', {
                variant: 'error'
              });
            }
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
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <input onChange={(event) => { setImageUpload(event.target.files[0])}} name="articleImage" accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                    {imageUpload && imageUpload.name}
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Publish New Article
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

Result.propTypes = {
  className: PropTypes.string
};

export default Result;
