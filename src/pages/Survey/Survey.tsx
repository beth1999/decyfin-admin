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
import Label from '@/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import EditSurveyDialog from './EditSurveyDialog';
import { toast } from 'react-toastify';

function UserTab() {
  const theme = useTheme();
  const [surveyData, setSurveyData] = useState<SurveyProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [currentSurvey, setCurrentSurvey] = useState<SurveyProps | null>(null);

  useEffect(() => {
    getSurveyData();
  }, []);

  const getSurveyData = async () => {
    try {
      const { data } = await Api.get('/survey/');

      setSurveyData(data.data);
    } catch (err) {
      setSurveyData([]);
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

  const handleEditSurveyOpen = (survey: SurveyProps) => {
    setCurrentSurvey(survey);
    setOpenEditDialog(true);
  };

  const handleEditSurveyClose = () => {
    setOpenEditDialog(false);
  };

  const handleRemove = async (id: string) => {
    try {
      const { data } = await Api.delete(`/survey/${id}`);

      if (data && data.status) {
        toast.success('Successfully deleted');
      }
    } catch (err) {
      toast.error('Failed delete');
    }
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Question
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Option1
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Option2
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Option3
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Option4
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Option5
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Create Time
                </TableCell>
                <TableCell align="right" style={{ minWidth: 100 }}>
                  Status
                </TableCell>
                <TableCell align="right" style={{ minWidth: 80 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveyData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((survey: SurveyProps) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={survey.id}
                    >
                      <TableCell align="left">
                        <Tooltip title={survey.content} placement="top">
                          <Typography>
                            {survey.content.length > 30
                              ? survey.content.slice(0, 30) +
                                '...' +
                                survey.content.slice(-30)
                              : survey.content}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">
                        {survey.option1.length}
                      </TableCell>
                      <TableCell align="left">
                        {survey.option2.length}
                      </TableCell>
                      <TableCell align="left">
                        {survey.option3.length}
                      </TableCell>
                      <TableCell align="left">
                        {survey.option4.length}
                      </TableCell>
                      <TableCell align="left">
                        {survey.option5.length}
                      </TableCell>
                      <TableCell align="left">
                        {format(survey.created_at, 'MMMM dd yyyy')}
                      </TableCell>
                      <TableCell align="right" sx={{ p: 2 }}>
                        <Label
                          color={survey.status === 'OPEN' ? 'success' : 'error'}
                        >
                          {survey.status}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Survey" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleEditSurveyOpen(survey)}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Survey" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleRemove(survey.id)}
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
          count={surveyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <EditSurveyDialog
        open={openEditDialog}
        handleClose={handleEditSurveyClose}
        data={currentSurvey}
      />
    </>
  );
}

export default UserTab;
