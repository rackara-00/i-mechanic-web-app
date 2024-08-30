'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeRequests, SafeUser } from "@/app/types";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps{
    data: SafeListing;
    request?: SafeRequests;
    onAction?: (id: string)=> void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;

}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    request,
    onAction,
    disabled,
    actionLabel,
    actionId= "",
    currentUser

})=> {
    const router = useRouter();
    const {getByValue} = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();
            if(disabled){
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]
    )

    return (
        <div 
            onClick={() => router.push(`/listings/${data.id}`)}
            className="
            col-span-1 cursor-pointer group
            ">
            <div className="flex flex-col gap-2 w-full">
                <div 
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <Image
                        fill
                        alt="listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            w-full
                            h-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser} 
                        />

                    </div>
                    
                </div>
                <div className="font-semibold text-lg">
                    Mr. {data.title}
                </div>
                <div className="font-light text-neutral-800">
                    {data.category} Specialist, {data.car_model} 
                </div>
                {onAction && actionLabel &&(
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={()=>{}}
                    
                    />
                )}
            </div>
        </div>
    );
    
}

export default ListingCard;