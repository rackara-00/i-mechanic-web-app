'use client';

import { BiSearch } from 'react-icons/bi';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { useMemo } from 'react';

const Search = () => {
  const searchModal = useSearchModal();

  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');

  const locationLabel = useMemo(() => {
    if (locationValue)
      return getByValue(locationValue as string)?.label;

    return 'Find a Mechanic near you';
  }, [getByValue, locationValue]);

  return (
    <div
      onClick={searchModal.onOpen}
      className='
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      '>
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-semibold'>
        {locationLabel}
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='p-2 text-white rounded-full bg-orange-500'>
            <BiSearch size={18} />
          </div>
        </div>
        </div>
      </div>
  );
};

export default Search;
