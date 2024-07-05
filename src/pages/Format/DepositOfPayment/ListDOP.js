import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Grid
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user';
import JSON_CONST from '../../../components/CONSTVALUE.json';

// mock
import USERLISTDATA from '../../../_mock/user';
import Loader from '../../Loader/Loader';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: '*Transaction No', alignRight: false , search: true},
  { id: 'name', label: '*Bank Name', alignRight: false , search: true},
  { id: 'branch', label: '*Branch Name', alignRight: false , search: true},
  { id: 'builderName', label: '*Builder Name', alignRight: false , search: true},
  { id: 'customerBorrower', label: '*Customer Borrower', alignRight: false , search: true},
  { id: 'phoneNo', label: '*Phone No', alignRight: false , search: true},
  { id: 'reciptDate', label: 'Recipt Date', alignRight: false , search: false},
  { id: 'statusValue', label: '*Status', alignRight: false , search: true},
  // { id: 'action', label: 'Action', alignRight: false , search: true},
  // { id: '' , search: true},
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
    return filter(array, (_user) => _user.bank.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListDOP() {
  const navigate = useNavigate()

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('bank');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, setUSERLIST] = useState([]);

  // Bank Search Area
  const [BankSearch, setBankSearch] = useState('');
  const banksearchList = e => {
    const query = e.target.value;
    setBankSearch(query);    
  };

  // Search area START

  const [fromDataAutoFill, setFromDataAutoFill] = useState({
    bankList: [],
    branchList: [],
    userList: [],
    handledByList: [],
  });

  const [refBranch, setRefBranch] = useState([]);

  useEffect(() => {
    api();
  }, []);


  const arrageList = (response) => {
    const list = []
    response.data.forEach((row) => {
      if(row.status === 'true') {
        list.push(row)
      }
    })

    return list
  }

  const api = async () => {
    let bankList = []
    let branchList = []
    let userList = []
    let handledByList = []

    await axios.get(`${JSON_CONST.DB_URL}master/bank/list`)
      .then((response) => {
        bankList = arrageList(response);
      })

    await axios.get(`${JSON_CONST.DB_URL}master/branch/list`)
      .then((response) => {
        branchList = arrageList(response);
      })
    
    await axios.get(`${JSON_CONST.DB_URL}auth/userList`)
      .then((response) => {
        console.log(response)
        userList = arrageList(response);
      })

    await axios.get(`${JSON_CONST.DB_URL}master/handledBy/list`)
      .then((response) => {
        handledByList = arrageList(response);
      })
    
    setFromDataAutoFill({
      bankList,
      branchList,
      userList,
      handledByList
    })

    setRefBranch(branchList)

  }

  // Search area END

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.bank);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, bank) => {
    const selectedIndex = selected.indexOf(bank);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, bank);
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
      navigate(`/app/format/DepositOfPayment/${url}`, { replace: true });
    }
  }

  useEffect(() => {
     axios.get(`${JSON_CONST.DB_URL}depositOfPayment/registration/list`)
      .then((response) => {
        setUSERLIST(response.data)
        setFilteredData(response.data)
        setIsLoading(false);

      })
      .catch((error) => {
        console.log(error);
      });
  
  }, [])

  const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  }));

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = query => {
    const filtered = filteredUsers.filter(item => {
      const searchString = `${item.fileNo} ${item.bankName.name} ${item.branchName.name} ${item.phoneNo} ${item.id} ${item.builderName} ${item.customerBorrower} ${item.statusValue}`.toLowerCase();
      return searchString.includes(query.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const handleInputChange = e => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === '') {
      setFilteredData(filteredUsers);
    } else {
      handleSearch(query);
    }
  };
  

  // Loader
  const [isLoading, setIsLoading] = useState(true);


  // useEffect(() => {
  //   // Simulating data fetching or processing delay
  //   const delay = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(delay);
  // }, [filteredData])

  return (
    <Page title="Deposit Of Payment ">
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            Deposit Of Payment 
            </Typography>
            <Button variant="contained" onClick={() => redirectPage('0')} startIcon={<Iconify icon="eva:plus-fill" />}>
              New Entry
            </Button>
          </Stack>
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Button variant="outlined" color="info" onClick={() => redirectPage('homepage')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
              Dashboard
            </Button>
          </Stack> */}

          <Card sx={{ width: '100%' }}>
            {/* <UserListToolbar selected={selected} data={USERLIST} searchName={"bank Name"} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
            <Grid container alignItems="center" paddingLeft={10} paddingBottom={10} paddingRight={10} paddingTop={5} spacing={3}>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <SearchStyle
                  style={{marginTop: '20px', marginLeft: '20px'}}
                  value={searchQuery}
                  onChange={handleInputChange}
                  autoFocus
                  // eslint-disable-next-line no-template-curly-in-string
                  placeholder={`Search from " *yellow fields "`}
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} mt={2}>
                <FormControl fullWidth>
                  <InputLabel id="Bank-select-label">Bank</InputLabel>
                  <Select
                    labelId="Bank-select-label"
                    id="Bank-select"
                    value={BankSearch}
                    label="bank"
                    name="bank"  
                    fullWidth
                    onChange={banksearchList}
                  >
                    <MenuItem value=''>All</MenuItem>
                    {fromDataAutoFill.bankList.map((option) => (<MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 100}}>
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
                    {filteredData
                      .filter((row) => BankSearch === '' || row.bankName.id === BankSearch)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { id, bank, branch, contactPerson,bankName, branchName, address, email, phoneOne, status, avatarUrl } = row;
                      const isItemSelected = selected.indexOf(bank) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox" /> */}

                          <TableCell align="left">{id}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {typeof avatarUrl !== "undefined"? <Avatar alt={bank} src={avatarUrl} /> : null}
                              <Typography variant="subtitle2" noWrap>
                                {bankName.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {branchName.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.builderName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.customerBorrower}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.phoneNo}
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {row.reciptDate}
                              </Typography>
                            </Stack>
                          </TableCell>
                          

                          {/* <TableCell align="left">
                            <Label variant="ghost" color={status === 'false' ? 'error' : 'success'}>
                              {sentenceCase( status === 'true' ? 'active' : 'in active')}
                            </Label>
                          </TableCell> */}
                          <TableCell align="left">
                            <Label variant="ghost" color={'secondary'}>
                            {row.statusValue || 'NA'}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu urlTo={'/app/format/DepositOfPayment/'} data={row} dataID={id} deleteURL={'disbursal/registration/delete/'} />
                          </TableCell>
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
      )}
    </Page>
  );
}
