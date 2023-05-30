import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@mui/material';
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'name', label: 'Bank Name', alignRight: false },
  { id: 'branch', label: 'Branch Name', alignRight: false },
  { id: 'registrationDate', label: 'Reg Date', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'status', label: 'Active Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },

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
    return filter(array, (_user) => _user.bank.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListBT() {
  const navigate = useNavigate()

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('bank');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, setUSERLIST] = useState([]);

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
      navigate(`/app/disbursal/bt/${url}`, { replace: true });
    }
  }

  useEffect(() => {
     axios.get(`${JSON_CONST.DB_URL}disbursal/BT/list`)
      .then((response) => {
        setUSERLIST(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  
  }, [])
  

  return (
    <Page title="BT ( Loan Take Over )">
      <Container maxWidth="">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          BT ( Loan Take Over )
          </Typography>
          <Button variant="contained" onClick={() => redirectPage('newEntry/0')} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Entry
          </Button>
        </Stack>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="outlined" color="info" onClick={() => redirectPage('homepage')} startIcon={<Iconify icon="akar-icons:arrow-back" />}>
            Dashboard
          </Button>
        </Stack> */}

        <Card sx={{ width: '100%' }}>
          <UserListToolbar selected={selected} data={USERLIST} searchName={"bank Name"} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                              {row.registrationDate}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {address}
                            </Typography>
                          </Stack>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {row.phone}
                            </Typography>
                          </Stack>
                        </TableCell>
                        

                        <TableCell align="left">
                          <Label variant="ghost" color={status === 'false' ? 'error' : 'success'}>
                            {sentenceCase( status === 'true' ? 'active' : 'in active')}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu urlTo={'/app/disbursal/bt/newEntry/'} data={row} dataID={id} deleteURL={'disbursal/registration/delete/'} />
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
    </Page>
  );
}
