'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeRequests, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface RequestsClientProps {
  requests: SafeRequests[];
  currentUser?: SafeUser | null;
}

const RequestsClient: React.FC<RequestsClientProps> = ({
  requests,
  currentUser,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/requests/${id}`)
        .then(() => {
          toast.success('request cancelled');
          router.refresh();
        })
        .catch(error => {
          toast.error('Something went wrong.');
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
        title='Mechanics Request List'
        subtitle='Here is a list of Mechanic that were requested'
      />
      <div className='grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {requests.map(request => (
          <ListingCard
            key={request.id}
            data={request.listing}
            request={request}
            actionId={request.id}
            onAction={onCancel}
            disabled={deletingId === request.id}
            actionLabel='View Details'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default RequestsClient;
