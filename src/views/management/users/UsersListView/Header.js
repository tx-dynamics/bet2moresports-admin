import React from 'react';
// import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Breadcrumbs,
  // Button,
  Grid,
  Link,
  // SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import {
//   PlusCircle as PlusCircleIcon,
//   Download as DownloadIcon,
//   Upload as UploadIcon
// } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  // const history = useHistory();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link variant="body1" color="inherit" to="#" component={RouterLink}>
            Dashboard
          </Link>
          <Link variant="body1" color="inherit" to="#" component={RouterLink}>
            Management
          </Link>
          <Typography variant="body1" color="textPrimary">
            Users
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          All Users
        </Typography>
        <Box mt={2}></Box>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
