import React, { useEffect, useState } from 'react';
import {
  Card,
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
import Label from '@/components/Label';

interface SurveyProps {
  id: string;
  content: string;
  option1: string[];
  option2: string[];
  option3: string[];
  option4: string[];
  option5: string[];
  created_at: string;
  status: string;
}

function UserTab() {
  const [surveyData, setSurveyData] = useState<SurveyProps[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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

  return (
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
            </TableRow>
          </TableHead>
          <TableBody>
            {surveyData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((survey: SurveyProps) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={survey.id}>
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
                    <TableCell align="left">{survey.option1.length}</TableCell>
                    <TableCell align="left">{survey.option2.length}</TableCell>
                    <TableCell align="left">{survey.option3.length}</TableCell>
                    <TableCell align="left">{survey.option4.length}</TableCell>
                    <TableCell align="left">{survey.option5.length}</TableCell>
                    <TableCell align="left">
                      {format(survey.created_at, 'MMMM dd yyyy')}
                    </TableCell>
                    <TableCell align="right" sx={{ p: 2 }}>
                      <Label color={survey.status ? 'success' : 'error'}>
                        {survey.status}
                      </Label>
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
  );
}

export default UserTab;
