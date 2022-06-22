/* eslint-disable max-len */
import React,{useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { deletePodcast, updatePodcast } from 'src/services/PodcastService';
import { useSnackbar } from 'notistack';
import './styles/styles.css'
import {
  Box,
  Card,
  Divider,
  IconButton,
  makeStyles,
  Grid,
  Paper,
  SvgIcon,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Button,
  FormHelperText
} from '@material-ui/core';
import {
  Trash2 as DeleteIcon,
  Edit2 as EditIcon,
  Play as PlayIcon,

} from 'react-feather';
import {PhotoCamera , MusicNote} from '@material-ui/icons';
import * as Yup from 'yup';
import { Formik } from 'formik';

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
  customGrid: {
    padding: 50
  },
  customPaper: {
    backgroundColor: theme.palette.background.default
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
  Podcasts,
  updatePodcasts,
  ...rest
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [playSong, setPlaySong] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [imageUpload, setImageUpload] = useState(null)
  const [audioUpload, setAudioUpload] = useState(null)
  const [editPodcast, setEditPodcast] = useState(null)

  const handleOpen = (podcast) => {
    setEditPodcast(podcast)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handlePlay = (url) => {
    setPlaySong(true)

    setTimeout(() => {
      var audio = document.getElementById('audio');
  
      var source = document.getElementById('sourceAudio');
      source.src = url;
    
      audio.load(); //call this to just preload the audio without playing
      audio.play(); //call this to play the song right away
    }, 1000);
    
  };
  

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Divider />
      <PerfectScrollbar>
        <Box className='podcasts-box' maxHeight={720} minWidth={700}>
          <div>
            <div className='podcasts-grid-div'>
              {Podcasts.map((podcast) => (
                <Grid item>
                  <Paper className={['customPaper', classes.customPaper]}>
                    <div className='podcast-card' style={{ backgroundImage: `url(${podcast.thumbnail})`}}>
                    <div className='podcast-card-actions-div'>
                      <IconButton
                        onClick={() => {
                          deletePodcast(podcast)
                            .then(res => {
                              if(res){
                                enqueueSnackbar('Podcast Deleted Successfully', {
                                  variant: 'success'
                                });
                                updatePodcasts(res)
                              }else{
                                enqueueSnackbar('Podcast could not be deleted rigth now.', {
                                  variant: 'error'
                                });
                              }
                            })
                            .catch(err => {
                              enqueueSnackbar('Podcast could not be deleted rigth now.', {
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
                      <IconButton
                        onClick={() => {handleOpen(podcast)}}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                    </div>
                    <div className='podcast-card-title-div'>
                      <p style={{fontSize: '1.2em', fontWeight: '600'}}>{podcast.title}</p>
                      <p>{podcast.desc}</p>
                    </div>
                    <div onClick={() => {handlePlay(podcast.url)}} className='podcast-play-button'>
                      <SvgIcon fontSize="large">
                        <PlayIcon />
                      </SvgIcon>
                    </div>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </div>
            {
              playSong && <div className='audio-player-div'>
                <audio id="audio" controls>
                  <source id="sourceAudio" src='' type="audio/ogg"/>
                  Your browser does not support the audio tag.
                </audio>
              </div>
            }
          </div>
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
                    title: editPodcast?.title,
                    desc: editPodcast?.desc,
                    name: editPodcast?.name
                  }}
                  validationSchema={Yup.object().shape({
                    title: Yup.string().required(),
                    desc: Yup.string().required(),
                    name: Yup.string().required(),
                  })}
                  onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                      // Do api call
                      if(imageUpload || audioUpload || values.title !== editPodcast.title || values.desc !== editPodcast.desc || values.name !== editPodcast.name){
                        setSubmitting(true);
                          const res = await updatePodcast(editPodcast, imageUpload, audioUpload, values)
                          if(res){
                            enqueueSnackbar('Changes Saved', {
                              variant: 'success'
                            });
                            updatePodcasts(res)
                            handleClose()
                          }else{
                            enqueueSnackbar('Error While Saving Changes', {
                              variant: 'error'
                            });
                          }
                      }else{
                        enqueueSnackbar('No Changes detected!', {
                          variant: 'error'
                        });
                      }
                    }catch (err) {
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
                      <Box mt={1} mb={1}>
                        <input onChange={(event) => { setImageUpload(event.target.files[0])}} name="pickImage" accept="image/*" className={classes.input} id="image-icon-button-file" type="file" />
                        <label htmlFor="image-icon-button-file">
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                          {(imageUpload && imageUpload.name) || editPodcast.thumbnail}
                        </label>
                      </Box>
                      <Box mt={1} mb={1}>
                        <input onChange={(event) => { setAudioUpload(event.target.files[0])}} name="pickAudio" accept=".mp3" className={classes.input} id="audio-icon-button-file" type="file" />
                        <label htmlFor="audio-icon-button-file">
                          <IconButton color="primary" aria-label="upload audio" component="span">
                            <MusicNote />
                          </IconButton>
                          {(audioUpload && audioUpload.name) || editPodcast.url}
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
