import React, { useEffect, useState } from 'react';
import {
  Badge,
  Card,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import { Api } from '@/service/api';
import { toast } from 'react-toastify';

interface UserProps {
  id: string;
  address: string;
  username: string;
  created_at: string;
  status: string;
}

function UserTab() {
  const [userData, setUserData] = useState<UserProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await Api.get('/user');

      setUserData(data.data);
    } catch (err) {
      setUserData([]);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event: SelectChangeEvent, userId: string) => {
    Api.put(`/user/status/${userId}`, {
      status: event.target.value
    })
      .then((res) => {
        if (res.data) {
          const currentIndex = userData.findIndex((user) => user.id === userId);
          const updatedUser = {
            ...userData[currentIndex],
            status: event.target.value
          };
          const newUserData = [...userData];
          newUserData[currentIndex] = updatedUser;
          setUserData(newUserData);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed change status');
      });
  };

  return (
    <Card>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: 170 }}>
                Address
              </TableCell>
              <TableCell align="left" style={{ minWidth: 170 }}>
                Username
              </TableCell>
              <TableCell align="left" style={{ minWidth: 170 }}>
                Create Time
              </TableCell>
              <TableCell align="right" style={{ minWidth: 100 }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: UserProps) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell align="left">
                      <Tooltip title={row.address} placement="top">
                        <Typography>
                          {row.address.slice(0, 6) +
                            '...' +
                            row.address.slice(-5)}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">
                      {format(row.created_at, 'MMMM dd yyyy')}
                    </TableCell>
                    <TableCell align="right" sx={{ p: 2 }}>
                      <Badge
                        variant="dot"
                        color={row.status === 'OPEN' ? 'success' : 'error'}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left'
                        }}
                      >
                        <Select
                          variant="standard"
                          value={row.status}
                          onChange={(e: SelectChangeEvent) =>
                            handleChange(e, row.id)
                          }
                          sx={{ p: 1 }}
                        >
                          <MenuItem value="OPEN">OPEN</MenuItem>
                          <MenuItem value="BLOCK">BLOCK</MenuItem>
                        </Select>
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default UserTab;
