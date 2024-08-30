'use client';

import React from 'react';
import Button from '../Button';

interface ListingRequestProps {
  onSubmit: () => void;
  disabled?: boolean;
}

const ListingRequest: React.FC<ListingRequestProps> = ({
  onSubmit,
  disabled,
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='p-4'>
        <Button
          disabled={disabled}
          label='Request Mechanic'
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default ListingRequest;
