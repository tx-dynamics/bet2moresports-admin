import React from 'react';
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
  // CardHeader,
  // Checkbox,
  // Divider,
  // FormControlLabel,
  FormHelperText,
  Grid,
  // Paper,
  TextField,
  // Typography,
  makeStyles,
  // MenuItem
} from '@material-ui/core';
// import QuillEditor from 'src/components/QuillEditor';
// import FilesDropzone from 'src/components/FilesDropzone';
// import CategoryService from 'src/services/CategoryService';
// import CustomImageInput from 'src/components/CustomImageInput/CustomImageInput';
import PostService from 'src/services/PostService';
// import GetFileURLService from 'src/services/GetFileURLService';
// import MeditationService from 'src/services/MeditationService';
// import CustomAudioInput from 'src/components/CustomAudioInput/CustomAudioInput';

// const categories = [
//   {
//     id: 'shirts',
//     name: 'Shirts'
//   },
//   {
//     id: 'phones',
//     name: 'Phones'
//   },
//   {
//     id: 'cars',
//     name: 'Cars'
//   }
// ];

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

// const FILE_SIZE = 10024 * 1024;
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'audio/mp4',
  'audio/mpeg'
];

// const AUDIO_FORMATS = ['audio/mp4', 'audio/mpeg']; //Mime Types
export const validateImageType = value => {
  if (value) {
    let type = value.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    return SUPPORTED_FORMATS.includes(type);
  }
};

function MeditationCreateForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  // const [categories, setCategories] = useState([]);
  // const [allSubscriptions, setAllSubscriptions] = useState([]);
  // const [fileData, setFileData] = useState();

  // useEffect(() => {
  //   // CategoryService.getSingleTrackCategory('Meditation').then(res => {
  //   //   console.log('Cat RES: ', res);
  //   //   setCategories(res);
  //   // });
  //   // PostService.getAllRecords().then(res => {
  //   //   console.log('Sub RES: ', res);
  //   //   setAllSubscriptions(res);
  //   // });
  // }, []);

  // const handleFileChange = e => {
  //   e.preventDefault();
  //   console.log('SELECTED FIle: ');
  // };

  return (
    <Formik
      initialValues={{
        // articleName: '',
        articleHeading: '',
        articleBody: '',
        articleCategory: '',
        // trackFile: undefined,
        // coverPic: undefined,
        // isNew: false
      }}
      validationSchema={Yup.object().shape({
        // articleName: Yup.string().required(),
        articleHeading: Yup.string().required(),
        articleBody: Yup.string().required(),
        // articleName: Yup.string()
        //   .max(255)
        //   .required(),
        // articleHeading: Yup.string()
        //   .max(5000)
        //   .required(),
        // articleBody: Yup.string()
        //   .max(255)
        //   .required(),
        // trackFile: Yup.mixed().required(),
        // coverPic: Yup.mixed().required(),
        // isNew: Yup.bool().required()
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Do api call
          setSubmitting(true);
          console.log('Submitted Data: ', values);
          PostService.publishArticle({
            // articleName: values.articleName,
            heading: values.articleHeading,
            category: values.articleCategory,
            content: values.articleBody
          }).then(res => {
            console.log('got publishing post article', res);
            enqueueSnackbar('New Article Published', {
              variant: 'success'
            });
            history.push('/app/admin/industry-plugs');
          })
          // GetFileURLService.getFileUplaodURL({
          //   fileName: values.coverPic.name,
          //   type: values.coverPic.type
          // }).then(res1 => {
          //   console.log('GET URL: ', res1);
          //   fetch(res1.url, {
          //     method: 'PUT',
          //     headers: {
          //       'Content-Type': values.coverPic.type
          //     },
          //     body: values.coverPic
          //   }).then(response1 => {
          //     console.log('RESPONSE: CVER PC: ', response1);
          //     GetFileURLService.getFileUplaodURL({
          //       fileName: values.trackFile.name,
          //       type: values.trackFile.type
          //     }).then(res2 => {
          //       console.log('GET URL: ', res2);
          //       fetch(res2.url, {
          //         method: 'PUT',
          //         headers: {
          //           'Content-Type': values.trackFile.type
          //         },
          //         body: values.trackFile
          //       })
          //         .then(response2 => {
          //           console.log('RESPONSE: TF PC: ', response2);
          //           MeditationService.addRecord({
          //             articleName: values.articleName,
          //             trackFileKey: res2.key,
          //             isNew: values.isNew,
          //             articleHeading: values.articleHeading,
          //             articleBody: values.articleBody,
          //             trackImageKey: res1.key
          //           })
          //             .then(res3 => {
          //               console.log('RES3: ', res3);
          //               setStatus({ success: true });
          //               setSubmitting(false);
          //               enqueueSnackbar('Meditation Track Created', {
          //                 variant: 'success'
          //               });
          //               history.push('/app/tracks/meditation');
          //             })
          //             .catch(err => console.log('ERR3: ', err));
          //         })
          //         .catch(err => {
          //           console.log('Err in putting file on s3: ', err);
          //         });
          //     });
          //   });
          // });
        } catch (err) {
          // setErrors({ submit: err.message });
          // setStatus({ success: false });
          // setSubmitting(false);
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
                  {/* <TextField
                    error={Boolean(touched.articleName && errors.articleName)}
                    fullWidth
                    helperText={touched.articleName && errors.articleName}
                    label="Article Name"
                    name="articleName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.articleName}
                    variant="outlined"
                  /> */}

                  <Box mt={3} mb={1}>
                    <TextField
                      error={Boolean(
                        touched.articleHeading && errors.articleHeading
                      )}
                      helperText={touched.articleHeading && errors.articleHeading}
                      fullWidth
                      label="Article Heading"
                      name="articleHeading"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.articleHeading}
                      variant="outlined"
                    />
                  </Box>

                  <Box mt={3} mb={1}>
                    <TextField
                      error={Boolean(
                        touched.articleCategory && errors.articleCategory
                      )}
                      helperText={touched.articleCategory && errors.articleCategory}
                      fullWidth
                      label="Article Category"
                      name="articleCategory"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.articleCategory}
                      variant="outlined"
                    />
                  </Box>

                  <Box mt={3} mb={1}>
                    <TextField
                      error={Boolean(
                        touched.articleBody && errors.articleBody
                      )}
                      helperText={
                        touched.articleBody && errors.articleBody
                      }
                      fullWidth
                      // label="Article Body"
                      name="articleBody"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // SelectProps={{ native: true }}
                      value={values.articleBody}
                      variant="outlined"
                      multiline
                      placeholder="Article Body: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                  </Box>

                  {/* Options to upload file and cover picture */}
                  {/* <Box mt={3}>
                    <Field
                      name="trackFile"
                      component={CustomAudioInput}
                      title="Select a track file"
                      setFieldValue={setFieldValue}
                      errorMessage={
                        errors['trackFile'] ? errors['trackFile'] : undefined
                      }
                      touched={touched['trackFile']}
                      style={{ display: 'flex' }}
                      onBlur={handleBlur}
                    />
                  </Box>

                  <Box mt={3}>
                    <Field
                      name="coverPic"
                      component={CustomImageInput}
                      title="Select a Track Image"
                      setFieldValue={setFieldValue}
                      errorMessage={
                        errors['coverPic'] ? errors['coverPic'] : undefined
                      }
                      touched={touched['coverPic']}
                      style={{ display: 'flex' }}
                      onBlur={handleBlur}
                    />
                  </Box> */}

                  {/* <Box mt={3} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.description}
                      onChange={value => setFieldValue('description', value)}
                    />
                  </Paper>
                  {touched.description && errors.description && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )} */}
                </CardContent>
              </Card>
              {/* <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box> */}
              <Box mt={3}>
                {/* <Card>
                  <CardHeader title="Prices" />
                  <Divider /> */}
                {/* <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          fullWidth
                          helperText={
                            touched.price && errors.price
                              ? errors.price
                              : 'If you have a sale price this will be shown as old price'
                          }
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.salePrice && errors.salePrice)}
                          fullWidth
                          helperText={touched.salePrice && errors.salePrice}
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.salePrice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid> 
                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.isTaxable}
                            onChange={handleChange}
                            value={values.isTaxable}
                            name="isTaxable"
                          />
                        }
                        label="Product is taxable"
                      />
                    </Box>
                    <Box mt={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.includesTaxes}
                            onChange={handleChange}
                            value={values.includesTaxes}
                            name="includesTaxes"
                          />
                        }
                        label="Price includes taxes"
                      />
                    </Box>
                  </CardContent>*/}
                {/* </Card> */}
              </Box>
            </Grid>
            {/* <Grid item xs={12} lg={4}>
              <Card>
                <CardHeader title="Organize" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.category}
                    variant="outlined"
                  >
                    {categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(touched.productCode && errors.productCode)}
                      fullWidth
                      helperText={touched.productCode && errors.productCode}
                      label="Product Code"
                      name="productCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productCode}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(touched.productSku && errors.productSku)}
                      fullWidth
                      helperText={touched.productSku && errors.productSku}
                      label="Product Sku"
                      name="productSku"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productSku}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          */}
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

MeditationCreateForm.propTypes = {
  className: PropTypes.string
};

export default MeditationCreateForm;
