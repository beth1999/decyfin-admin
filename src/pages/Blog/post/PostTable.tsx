/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  SelectChangeEvent,
  Tooltip
} from '@mui/material';

import { Api } from '@/service/api';
import Label from '@/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { toast } from 'react-toastify';
import EditPostDialog from './EditPostDialog';

type CryptoOrderStatus = 'all' | 'visible' | 'invisible';

interface RecentOrdersTableProps {
  className?: string;
  posts: PostProps[];
}

interface Filters {
  status: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map: any = {
    all: {
      text: 'Both',
      color: 'primary'
    },
    visible: {
      text: 'Visible',
      color: 'success'
    },
    invisible: {
      text: 'Invisible',
      color: 'error'
    }
  };

  const {
    text,
    color
  }: {
    text: string;
    color:
      | 'primary'
      | 'black'
      | 'secondary'
      | 'error'
      | 'warning'
      | 'success'
      | 'info';
  } = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (posts: PostProps[], filters: Filters): PostProps[] => {
  return posts.filter((post: PostProps) => {
    let matches = true;

    if (
      filters.status !== 'all' &&
      (post.status ? 'visible' : 'invisible') !== filters.status
    ) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: PostProps[],
  page: number,
  limit: number
): PostProps[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ posts }) => {
  const [currentPost, setCurrentPost] = useState<PostProps | null>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<any>({
    status: 'all'
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'visible',
      name: 'Visible'
    },
    {
      id: 'invisible',
      name: 'Invisible'
    }
  ];

  const handleStatusChange = (e: SelectChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      status: e.target.value
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked ? posts.map((post: PostProps) => post.id) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    _: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (_: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleEditOpen = (post: PostProps) => {
    setCurrentPost(post);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const filteredCryptoOrders = applyFilters(posts, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < posts.length;
  const selectedAllCryptoOrders = selectedCryptoOrders.length === posts.length;
  const theme = useTheme();

  const handleRemove = async (id: string) => {
    try {
      const { data } = await Api.delete(`/post/${id}`);

      if (data && data.status) {
        toast.success('Successfully removed');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <Card>
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        {!selectedBulkActions && (
          <CardHeader
            action={
              <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            }
            title="Total Posts"
          />
        )}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedAllCryptoOrders}
                    indeterminate={selectedSomeCryptoOrders}
                    onChange={handleSelectAllCryptoOrders}
                  />
                </TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCryptoOrders.map((post) => {
                const isCryptoOrderSelected = selectedCryptoOrders.includes(
                  post.id
                );
                return (
                  <TableRow
                    hover
                    key={post.id}
                    selected={isCryptoOrderSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isCryptoOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneCryptoOrder(event, post.id)
                        }
                        value={isCryptoOrderSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={post.author_id} placement="top">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {post.author_id.slice(0, 5) +
                            '...' +
                            post.author_id.slice(-5)}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={post.category.name} placement="top">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          <Label color="info">
                            {post.category.name.length > 11
                              ? post.category.name.slice(0, 10) +
                                '...' +
                                post.category.name.slice(-8)
                              : post.category.name}
                          </Label>
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={post.title.length > 30 && post.title}
                        placement="top"
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {post.title.length > 30
                            ? post.title.slice(0, 30) + '...'
                            : post.title}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={post.content.length > 40 && post.content}
                        placement="top"
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {post.content.length > 40
                            ? post.content.slice(0, 40) + '...'
                            : post.content}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {format(post.created_at, 'MMMM dd yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {getStatusLabel(post.status ? 'visible' : 'invisible')}
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
                          onClick={() => handleEditOpen(post)}
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
                          onClick={() => handleRemove(post.id)}
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
        <Box p={2}>
          <TablePagination
            component="div"
            count={filteredCryptoOrders.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>

      <EditPostDialog
        open={openEdit}
        handleClose={handleEditClose}
        data={currentPost}
      />
    </>
  );
};

export default RecentOrdersTable;
