'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface MechanicsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const MechanicsClient: React.FC<MechanicsClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted');
          router.refresh();
        })
        .catch(error => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title='Mechanics'
        subtitle='List of your Mechanics'
      />
      <div className='grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel='Delete mechanic'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default MechanicsClient;
