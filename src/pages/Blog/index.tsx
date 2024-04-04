import { ChangeEvent, useState } from 'react';
import { Grid, Container, styled, Tabs, Tab } from '@mui/material';

import PageHeader from './PageHeader';
import RecentOrders from './RecentOrders';
import NewPostDialog from './NewPostDialog';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import Footer from '@/components/Footer';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
  `
);

function ApplicationsTransactions() {
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('blog');

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const tabs = [
    { value: 'blog', label: 'Blog' },
    { value: 'comment', label: 'Comment' }
  ];

  const handleTabsChange = (_: ChangeEvent<object>, value: string): void => {
    setCurrentTab(value);
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
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'blog' && <RecentOrders />}
            {currentTab === 'comment' && <h3>No data</h3>}
          </Grid>
        </Grid>
      </Container>

      <NewPostDialog open={openNew} handleClose={handleCloseNew} />
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
