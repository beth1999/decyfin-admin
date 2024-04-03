import { useState } from 'react';
import PageHeader from './PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import RecentOrders from './RecentOrders';
import NewPostDialog from './NewPostDialog';

function ApplicationsTransactions() {
  const [openNew, setOpenNew] = useState<boolean>(false);

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  return (
    <>
      <PageTitleWrapper>
        <PageHeader setOpen={setOpenNew} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>

      <NewPostDialog open={openNew} handleClose={handleCloseNew} />
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
