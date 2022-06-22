/* eslint-disable max-len */
import React, { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  // Button,
  Card,
  // Checkbox,
  Divider,
  IconButton,
  // InputAdornment,
  // Link,
  SvgIcon,
  // Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  // Tabs,
  // TextField,
  // MenuItem,
  // Typography,
  makeStyles
} from '@material-ui/core';
// import { useHistory } from 'react-router';
import {
  // Edit as EditIcon,
  Trash2 as DeleteIcon,
  // ArrowUpRight as ArrowRightIcon,
  // ArrowUp as ArrowUpIcon,
  // Search as SearchIcon
} from 'react-feather';
// import getInitials from 'src/utils/getInitials';
import MeditationService from 'src/services/MeditationService';
// import CategoryService from 'src/services/CategoryService';

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

function Results({
  className,
  customers,
  getArticles,
  // categories,
  // setQuery,
  // query,
  ...rest
}) {
  console.log('CUSTOMER IN MEDITO ;', customers);
  const classes = useStyles();
  // const history = useHistory();
  // const [currentTab, setCurrentTab] = useState('all');
  const [selectedCustomers] = useState([]);
  // const [page, setPage] = useState(0);
  // const [limit, setLimit] = useState(10);
  // const [categories, setCategories] = useState([]);
  // const [query, setQuery] = useState('');
  // const [sort, setSort] = useState(null);
  // const [filters, setFilters] = useState({
  //   isProspect: null,
  //   isReturning: null,
  //   acceptsMarketing: null
  // });

  // useEffect(()=>{
  //   CategoryService.getAllCategories().then(res => {
  //     console.log('RES: ', res);
  //     setCategories(res);
  //   });
  // },[])

  // const handleTabsChange = (event, value) => {
  //   const updatedFilters = {
  //     ...filters,
  //     isProspect: null,
  //     isReturning: null,
  //     acceptsMarketing: null
  //   };

  //   if (value !== 'all') {
  //     updatedFilters[value] = true;
  //   }

  //   setFilters(updatedFilters);
  //   setSelectedCustomers([]);
  //   setCurrentTab(value);
  // };

  // const handleQueryChange = event => {
  //   event.persist();
  //   setQuery(event.target.value);
  // };

  // const handleSortChange = event => {
  //   event.persist();
  //   setSort(event.target.value);
  // };

  // const handleSelectAllCustomers = event => {
  //   setSelectedCustomers(
  //     event.target.checked ? customers.map(customer => customer.id) : []
  //   );
  // };

  // const handleSelectOneCustomer = (event, customerId) => {
  //   if (!selectedCustomers.includes(customerId)) {
  //     setSelectedCustomers(prevSelected => [...prevSelected, customerId]);
  //   } else {
  //     setSelectedCustomers(prevSelected =>
  //       prevSelected.filter(id => id !== customerId)
  //     );
  //   }
  // };

  // const handlePageChange = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleLimitChange = event => {
  //   setLimit(event.target.value);
  // };

  // const enableBulkOperations = selectedCustomers.length > 0;
  // const selectedSomeCustomers =
  //   selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  // const selectedAllCustomers = selectedCustomers.length === customers.length;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      {/* <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs> */}
      <Divider />

      <Box p={2} minHeight={56} display="flex" alignItems="center">
        {/* Commented by me */}
        {/* <TextField
          className={classes.availabilityField}
          label="Availability"
          name="availability"
          onChange={handleQueryChange}
          // onBlur={handleBlur}
          select
          // SelectProps={{ native: true }}
          value={query || 'all'}
          variant="outlined"
        >
          <MenuItem key="All" value="All">
            All
          </MenuItem>
          {categories.map(avalabilityOption => (
            <MenuItem key={avalabilityOption._id} value={avalabilityOption._id}>
              {avalabilityOption.name}
            </MenuItem>
          ))}
        </TextField> */}
        {/* Commented by me */}
        {/* <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search customers"
          value={query}
          variant="outlined"
        /> */}
        <Box flexGrow={1} />
        {/* <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField> */}
      </Box>
      {/* {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCustomers}
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Edit
            </Button>
          </div>
        </div>
      )} */}
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllCustomers}
                    indeterminate={selectedSomeCustomers}
                    onChange={handleSelectAllCustomers}
                  />
                </TableCell> */}
                <TableCell>Date</TableCell>
                <TableCell>Article Heading</TableCell>
                <TableCell>Category</TableCell>
                {/* <TableCell>Cover Picture</TableCell> */}
                <TableCell>Content</TableCell>
                {/* <TableCell>Shares</TableCell> */}
                {/* <TableCell>Article</TableCell> */}
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map(customer => {
                const isCustomerSelected = selectedCustomers.includes(
                  customer.id
                );

                return (
                  <TableRow
                    hover
                    key={customer?._id}
                    selected={isCustomerSelected}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCustomerSelected}
                        onChange={event =>
                          handleSelectOneCustomer(event, customer._idid)
                        }
                        value={isCustomerSelected}
                      />
                    </TableCell> */}
                    <TableCell>{new Date(customer?.date).toLocaleDateString()}</TableCell>
                    <TableCell>{customer?.heading}</TableCell>
                    <TableCell>{customer?.category}</TableCell>
                    {/* <TableCell>{customer?.coverPhoto}</TableCell> */}
                    {/* <TableCell>
                      <IconButton
                        onClick={() =>
                          window.open(customer?.coverPhoto, '_blank')
                        }
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell> */}
                    <TableCell>{customer?.content}</TableCell>
                    {/* <TableCell>{customer?.shares}</TableCell> */}

                    {/* window.open(newPageUrl, "_blank") */}
                    {/* <TableCell>
                      <IconButton
                        onClick={() =>
                          window.open(customer?.trackFile, '_blank')
                        }
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell> */}
                    {/* <TableCell>
                      <IconButton
                        onClick={() =>
                          window.open(customer?.trackImage, '_blank')
                        }
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell> */}
                    {/* <TableCell>
                      <IconButton
                        onClick={() =>
                          window.open(customer?.content, '_blank')
                        }
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell> */}
                    {/* <TableCell>
                      <TableCell> */}
                    {/* {customer?.subscriptionType.map(st => (
                          <>{st?.subscriptionName} , </>
                        ))} */}
                    {/* {customer.subscriptionType.subscriptionName} */}
                    {/* </TableCell>
                    </TableCell> */}
                    <TableCell align="right">
                      {/* <IconButton
                        component={RouterLink}
                        to={'/app/tracks/meditation/edit/' + customer?._id}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton> */}
                      <IconButton
                        onClick={() => {
                          MeditationService.deleteArticle(customer._id)
                            .then(res => {
                              console.log('RES: ', res);
                              getArticles();
                              // window.location.reload();
                            })
                            .catch(err => console.log('ERR: ', err));
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
