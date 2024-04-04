import React from 'react';
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

type PostDataProps = {
  title: string;
  content: string;
  status: boolean;
};

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

export default function NewPostDialog({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [postData, setPostData] = React.useState<PostDataProps>({
    title: '',
    content: '',
    status: true
  });

  const handleSubmit = async () => {
    if (postData.title.trim() === '' || postData.content.trim() === '') {
      return;
    }

    try {
      const { data } = await Api.post('/post/create', postData);

      if (data && data.status) {
        toast.success('Successfully created');
        setPostData({
          title: '',
          content: '',
          status: true
        });
        handleClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
    >
      <DialogTitle>Post new blog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a title and content here for your new post for our users.
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
            id="title"
            name="title"
            label="Please enter title"
            type="text"
            fullWidth
            variant="outlined"
            value={postData.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPostData({
                ...postData,
                [e.target.name]: e.target.value
              })
            }
          />
          <TextField
            id="content"
            name="content"
            label="Please enter content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={postData.content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPostData({
                ...postData,
                [e.target.name]: e.target.value
              })
            }
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name="status"
                  checked={postData.status}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPostData({
                      ...postData,
                      [e.target.name]: e.target.checked
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
