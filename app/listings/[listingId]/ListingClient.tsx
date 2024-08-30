'use client';

import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeRequests, SafeUser } from "@/app/types";
import { useCallback, useMemo, useState } from "react";
import { Request } from "@prisma/client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingRequest from "@/app/components/listings/ListingRequest";

interface ListingClientProps {
    requests?: SafeRequests[];
    listing: SafeListing & {
      user: SafeUser;
    };
    currentUser?: SafeUser | null;
  }
  
  const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    requests = [],
    currentUser,
  }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const onCreateRequest = useCallback(() => {
        if (!currentUser) {
          return loginModal.onOpen();
        }
    
        setIsLoading(true);
    
        axios
          .post('/api/requests', {
            listingId: listing?.id,
          })
          .then(() => {
            toast.success('Request sent successfully');
            //redirect to /trips
            router.push('/requests');
          })
          .catch(err => {
            toast.error('Something went wrong');
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, [
        listing?.id,
        router,
        currentUser,
        loginModal,
      ]);
    const category = useMemo(() => {
        return categories.find(
          category => category.label === listing.category
        );
      }, [listing.category]);


    return(
        <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
            <ListingHead
                id={listing.id}
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue={listing.locationValue}
                currentUser={currentUser}
            />
            <div className='grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10'>
            <ListingInfo
              category={category}
              description={listing.description}
              car_model={listing.car_model}
              contact={listing.contact}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingRequest
                onSubmit={onCreateRequest}
                disabled={isLoading}
              />
            </div>
            </div>
            </div>
        </div>

        </Container>
    )
  };
  
  export default ListingClient;
  