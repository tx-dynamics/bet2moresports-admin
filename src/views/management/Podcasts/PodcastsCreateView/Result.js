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
import {PhotoCamera , MusicNote} from '@material-ui/icons';

import { addPodcast } from 'src/services/PodcastService';

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
  const [audioUpload, setAudioUpload] = useState(null)
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        title: '',
        desc: '',
        name: ''
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required(),
        desc: Yup.string().required(),
        name: Yup.string().required(),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Do api call
          if (imageUpload === null) {
            enqueueSnackbar('Please upload an image', {variant: 'error'})
          }else if(audioUpload === null){
            enqueueSnackbar('Please upload an audio file', {variant: 'error'})
          }else{
            setSubmitting(true);
            const res = await addPodcast(imageUpload, audioUpload, values)
            if(res){
              enqueueSnackbar('New Picture Added', {
                variant: 'success'
              });
              history.push('/app/management/podcasts');
            }else{
              enqueueSnackbar('Error While Adding New Picture', {
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
                  <Box mt={1} mb={1}>
                    <input onChange={(event) => { setImageUpload(event.target.files[0])}} name="pickImage" accept="image/*" className={classes.input} id="image-icon-button-file" type="file" />
                    <label htmlFor="image-icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                      {imageUpload && imageUpload.name}
                    </label>
                  </Box>
                  <Box mt={1} mb={1}>
                    <input onChange={(event) => { setAudioUpload(event.target.files[0])}} name="pickAudio" accept=".mp3" className={classes.input} id="audio-icon-button-file" type="file" />
                    <label htmlFor="audio-icon-button-file">
                      <IconButton color="primary" aria-label="upload audio" component="span">
                        <MusicNote />
                      </IconButton>
                      {audioUpload && audioUpload.name}
                    </label>
                  </Box>
                  <Box mt={3} mb={1}>
                    <TextField
                      error={Boolean(
                        touched.name && errors.name
                      )}
                      helperText={touched.name && errors.name}
                      fullWidth
                      label="Uploader Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={3} mb={1}>
                    <TextField
                      error={Boolean(
                        touched.title && errors.title
                      )}
                      helperText={touched.title && errors.title}
                      fullWidth
                      label="Podcast Title"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={3} mb={1}>
                    <TextField
                      error={Boolean(
                        touched.desc && errors.desc
                      )}
                      helperText={touched.desc && errors.desc}
                      fullWidth
                      label="Podcast Discription"
                      name="desc"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.desc}
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
              Add New Podcast
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
