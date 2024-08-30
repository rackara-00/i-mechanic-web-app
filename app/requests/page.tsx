import React from 'react';

import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getRequests from '../actions/getRequests';
import RequestsClient from './RequestClient';


const RequestsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='You are not signed in'
          subtitle='Sign in to view your requests'
        />
      </ClientOnly>
    );
  }

  const requests = await getRequests({
    authorId: currentUser.id,
  });

  if (requests.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='You have no requests'
          subtitle='Try searching for a listing'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RequestsClient
        requests={requests}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default RequestsPage;