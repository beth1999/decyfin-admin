import React, { useEffect, useState } from 'react';
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { format } from 'date-fns';
import { Api } from '@/service/api';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditCategoryDialog from './EditCategoryDialog';
import { toast } from 'react-toastify';

function Category() {
  const theme = useTheme();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentCategory, setCurrentCategory] = useState<CategoryProps | null>(
    null
  );
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    try {
      const { data } = await Api.get('/category');

      setCategories(data.data);
    } catch (err) {
      setCategories([]);
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

  const handleEditCategoryOpen = (category: CategoryProps) => {
    setCurrentCategory(category);
    setOpenEditDialog(true);
  };

  const handleEditCategoryClose = () => {
    setOpenEditDialog(false);
  };

  const handleRemove = async (id: string) => {
    try {
      const { data } = await Api.delete(`/category/${id}`);

      if (data && data.status) {
        toast.success('Successfully removed');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data) {
        toast.error(err.response.data);
      } else {
        toast.error('Something went wrong!');
      }
    }
  };

  return (
    <>
      <Card>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  No
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Create Time
                </TableCell>
                <TableCell align="right" style={{ minWidth: 170 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: CategoryProps, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">
                        <Typography>{index + 1}</Typography>
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">
                        {format(row.created_at, 'MMMM dd yyyy')}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Post" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleEditCategoryOpen(row)}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Post" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleRemove(row.id)}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
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
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <EditCategoryDialog
        open={openEditDialog}
        handleClose={handleEditCategoryClose}
        data={currentCategory}
      />
    </>
  );
}

export default Category;
