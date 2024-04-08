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

export default function EditVoteDialog({
  open,
  handleClose,
  data
}: {
  open: boolean;
  handleClose: () => void;
  data: VoteProps | null;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [vote, setVote] = React.useState<VoteProps>({
    id: '',
    question: '',
    status: 'OPEN'
  });

  useEffect(() => {
    setVote({
      id: data?.id || '',
      question: data?.question || '',
      status: data?.status || 'OPEN'
    });
  }, [data]);

  const handleSubmit = async () => {
    if (vote.question.trim() === '') {
      return;
    }

    try {
      const { data } = await Api.put(`/vote/${vote.id}`, {
        question: vote.question,
        status: vote.status
      });

      if (data && data.status) {
        toast.success('Successfully updated');
        setVote({
          id: '',
          question: '',
          status: 'OPEN'
        });
        handleClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      toast.error('Failed updated');
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
    >
      <DialogTitle>Create new category</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a name here for your new category for our users.
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
            label="Please enter vote content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={vote.question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVote({ ...vote, question: e.target.value })
            }
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={vote.status === 'OPEN' ? true : false}
                  onChange={(e) =>
                    e.target.checked
                      ? setVote({ ...vote, status: 'OPEN' })
                      : setVote({ ...vote, status: 'BLOCK' })
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
