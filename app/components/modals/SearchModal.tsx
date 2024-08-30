'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import qs from 'query-string';
import Heading from '../Heading';

enum STEPS {
  LOCATION = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [location, setLocation] = useState<CountrySelectValue>();

  const [step, setStep] = useState(STEPS.LOCATION);

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location]
  );

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
    };

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [step, searchModal, router, location, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return 'Search';
    }

    return;
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading title='Where are you?' subtitle='Find a mechanic near you' />
      <CountrySelect
        value={location}
        onChange={value => setLocation(value as CountrySelectValue)}
      />
      <hr />
      {location?.latlng && <Map center={location.latlng} />} {/* Conditional check added here */}
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='Filters'
      actionLabel="Search"
      disabled={false}
      body={bodyContent}
    />
  );
};

export default SearchModal;
