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
  Divider
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

export default function EditCategoryDialog({
  open,
  handleClose,
  data
}: {
  open: boolean;
  handleClose: () => void;
  data: CategoryProps | null;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [category, setCategory] = React.useState<CategoryProps>({
    id: '',
    name: '',
    created_at: ''
  });

  useEffect(() => {
    setCategory({
      id: data?.id || '',
      name: data?.name || '',
      created_at: data?.created_at || ''
    });
  }, [data]);

  const handleSubmit = async () => {
    if (category.name.trim() === '') {
      return;
    }

    try {
      const { data } = await Api.put(`/category/${category.id}`, {
        name: category.name
      });

      if (data && data.status) {
        toast.success('Successfully updated');
        setCategory({ id: '', name: '', created_at: '' });
        handleClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
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
            label="Please enter name"
            type="text"
            fullWidth
            variant="outlined"
            value={category.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategory({ ...category, name: e.target.value })
            }
          />
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
