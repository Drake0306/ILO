import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  TextField,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import axios from 'axios';


// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user';
import JSON_CONST from '../../../components/CONSTVALUE.json';
// mock
// import USERLIST from '../../../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'custName', label: 'Cust Name', alignRight: false },
  { id: 'refNo', label: 'Ref No', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'bankName', label: 'Bank Name', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DuDupe() {
  const navigate = useNavigate()

  const [fromData, setFromData] = useState({
    flatHousePlotNo: '',
    streetSectorLocal: '',
    districtStatePin: '',
    status: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const [USERLIST, setUSERLIST] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const redirectPage = async (url) => {
    if(url === "homepage") {
      navigate(`/app/dashboard/`, { replace: true });
    } else {
      navigate(`/app/option/${url}`, { replace: true });
    }
  }

  const onSubmit = async (event) => {    
    event.preventDefault()
    setIsSubmitting(true);
    const fromElementsData = event.target.elements
    const sendPost = {
      flatHousePlotNo: fromElementsData.flatHousePlotNo.value,
      streetSectorLocal: fromElementsData.streetSectorLocal.value,
      districtStatePin: fromElementsData.districtStatePin.value,
    }

    try {
      console.log(sendPost)
      await axios.post(`${JSON_CONST.DB_URL}option/dudupe/`, sendPost)
        .then((response) => {
          console.log(response);
          setUSERLIST(response.data)
          setIsSubmitting(false);
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.log(error);
        });
    }
    catch (err) {
      console.log(err)
    }
  }
  
  const onChangeFields = async (event) => {
    if(event.target.name === 'status') {
      setFromData({
        ...fromData,
        [event.target.name]: !fromData.status
      });
    } else {
      setFromData({
        ...fromData,
        [event.target.name]: event.target.value
      });
    }
  };

  return (
    <Page title="Prepare Reports De Dupe">
      <Container maxWidth="">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Prepare Reports De Dupe
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('homepage')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            Dashboard
          </Button>
        </Stack>

        <form methods="post" onSubmit={onSubmit}>
        <Card>
            <Grid container alignItems="center" paddingLeft={2} paddingBottom={2} paddingRight={2} paddingTop={5} spacing={3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.flatHousePlotNo}
                        name="flatHousePlotNo"
                        label="Flat / House / Plot No"
                        type="text"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.streetSectorLocal}
                        name="streetSectorLocal"
                        label="Street / Sector / Locality"
                        type="text"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField
                        onChange={onChangeFields}
                        fullWidth
                        value={fromData.districtStatePin}
                        name="districtStatePin"
                        label="District / State / Pin"
                        type="text"
                    />
                </Grid>

                <Grid item xs={12} sm={3} md={3} lg={3}>
                    <LoadingButton fullWidth size="large" startIcon={<Iconify icon="et:search" />} type="submit" variant="contained" color="error" loading={isSubmitting}>
                        Search for Records
                    </LoadingButton>
                </Grid>
            </Grid>
        </Card>
        </form>

        <Card sx={{ width: '100%', marginTop: '30px' }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800}}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, branch, contactPerson, address, email, phoneOne, status, avatarUrl } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        // role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox" /> */}

                        <TableCell component="th" style={{textAlign: "center"}} scope="row" paddingLeft="10px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.customerBorrower}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.RepRefNo}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.reciptDate}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.flatHousePlotNo} / {row.streetSectorLocal}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              {row.bankName.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="10px">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography style={{textAlign: "center"}} variant="subtitle2" noWrap>
                              Report
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === false && 'error') || 'success'}>
                            {sentenceCase( status === true ? 'active' : 'in active')}
                          </Label>
                        </TableCell> */}

                        {/* <TableCell align="right">
                          <UserMoreMenu urlTo={'/app/option/prepareReports/newEntry/'} data={row} />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {/* Check For No Search Found  */}
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
