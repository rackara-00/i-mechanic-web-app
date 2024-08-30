import React from 'react';
import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import getListings from '../actions/getListings';
import MechanicsClient from './MechanicsClient';

const MechanicsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='UnAuthorized'
          subtitle='Please login to view your trips.'
        />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No Mechanics found'
          subtitle='Looks like you have no Mechanics yet.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MechanicsClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default MechanicsPage;
