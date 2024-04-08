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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Api } from '@/service/api';
import EditVoteDialog from './EditVoteDialog';
import Label from '@/components/Label';

function Vote() {
  const theme = useTheme();
  const [votes, setVotes] = useState<VoteProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentVote, setCurrentVote] = useState<VoteProps | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  useEffect(() => {
    getVotes();
  }, []);

  const getVotes = async () => {
    try {
      const { data } = await Api.get('/vote');

      setVotes(data.data);
    } catch (err) {
      setVotes([]);
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

  const handleEditCategoryOpen = (vote: VoteProps) => {
    setCurrentVote(vote);
    setOpenEditDialog(true);
  };

  const handleEditVoteClose = () => {
    setOpenEditDialog(false);
  };

  return (
    <>
      <Card>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  No
                </TableCell>
                <TableCell align="left" style={{ minWidth: 270 }}>
                  Question
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Answer(Yes)
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Answer(No)
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Answer(Not sure)
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Status
                </TableCell>
                <TableCell align="right" style={{ minWidth: 100 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {votes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vote: VoteProps, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={vote.id}>
                      <TableCell align="left">
                        <Typography>{index + 1}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip title={vote.question} placement="top">
                          <Typography>
                            {vote.question.length > 35
                              ? vote.question.slice(0, 35) + '...'
                              : vote.question}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">{vote.y_vote?.length}</TableCell>
                      <TableCell align="left">{vote.n_vote?.length}</TableCell>
                      <TableCell align="left">{vote.nt_vote?.length}</TableCell>
                      <TableCell align="left">
                        <Label
                          color={vote.status === 'OPEN' ? 'success' : 'error'}
                        >
                          {vote.status}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Vote" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleEditCategoryOpen(vote)}
                          >
                            <EditTwoToneIcon fontSize="small" />
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
          count={votes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <EditVoteDialog
        open={openEditDialog}
        handleClose={handleEditVoteClose}
        data={currentVote}
      />
    </>
  );
}

export default Vote;
