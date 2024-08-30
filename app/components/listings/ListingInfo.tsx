'use client';

import React from 'react';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';

import dynamic from 'next/dynamic';
import ListingCategory from './ListingCategory';
import { FaWhatsapp } from 'react-icons/fa';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
  description: string;
  car_model: string;
  contact: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  car_model,
  contact,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

   // Construct WhatsApp URL
  const whatsappURL = `https://wa.me/${contact}`;

  return (
    <div className='flex flex-col col-span-4 gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>Based in: {car_model}</div>
          <div>
          <button
            onClick={() => window.open(whatsappURL, '_blank')}
            className='flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600'
          >
            <FaWhatsapp size={20} /> {/* WhatsApp icon */}
            WhatsApp Me
          </button>
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
     
    </div>
  );
};

export default ListingInfo;
