import React, { useEffect } from 'react';
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  Button,
  TextField,
  Dialog,
  DialogActions,
  Slide,
  useMediaQuery,
  Box,
  Divider,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { styled, useTheme } from '@mui/material/styles';
import { Api } from '@/service/api';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: theme.spacing(2),
    boxShadow: '0 0 80px rgba(255,255,255,0.2)',
    borderRadius: '10px'
  }
}));

export default function EditSurveyDialog({
  open,
  handleClose,
  data
}: {
  open: boolean;
  handleClose: () => void;
  data: SurveyProps | null;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [surveyData, setSurveyData] = React.useState<{
    id: string;
    content: string;
    status: 'OPEN' | 'BLOCK';
  }>({
    id: '',
    content: '',
    status: 'OPEN'
  });

  useEffect(() => {
    setSurveyData({
      id: data?.id || '',
      content: data?.content || '',
      status: data?.status || 'OPEN'
    });
  }, [data]);

  const handleSubmit = async () => {
    if (surveyData.content.trim() === '') {
      return;
    }

    try {
      const { data } = await Api.put(`/survey/${surveyData.id}`, {
        content: surveyData.content,
        status: surveyData.status
      });

      if (data && data.status) {
        toast.success('Successfully updated');

        handleClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error('Failed update');
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
    >
      <DialogTitle>Edit current survey</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter new content here for editing your current survey for our
          users.
        </DialogContentText>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <TextField
            id="content"
            name="content"
            label="Please enter content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={surveyData.content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSurveyData({
                ...surveyData,
                [e.target.name]: e.target.value
              })
            }
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name="status"
                  checked={surveyData.status === 'OPEN' ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSurveyData({
                      ...surveyData,
                      [e.target.name]: e.target.checked ? 'OPEN' : 'BLOCK'
                    })
                  }
                />
              }
              label="Status"
            />
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
