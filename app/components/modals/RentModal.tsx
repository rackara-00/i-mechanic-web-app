'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS{
    CATEGORY= 0,
    LOCATION= 1,
    IMAGE= 2,
    DESCRIPTION= 3,
    INFO= 4,
    
}
const RentModal =() => {
    const router = useRouter();
    const rentModal = useRentModal();

    const[step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false)

    const{
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { 
            errors 
        },
        reset
    }= useForm<FieldValues>({
        defaultValues: {
            category: '',
            imageSrc: '',
            location: { latlng: { lat: 0, lng: 0 } },
            contact: '',
            title: '',
            car_model: '',
            description: ''
        }

    })

    const category = watch('category');
    const location = watch('location');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const setCustomValues = (id: string, value: any) => {
        setValue(id, value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
            
        });
    }

    const onBack = () =>{
        setStep((value)=> value-1);
    };

    const onNext = () =>{
        setStep((value)=> value+1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        if (step !== STEPS.INFO){
            return onNext();
        }

        setIsLoading(true);
        
        axios.post('/api/listings', data)
        .then(() => {
            toast.success("Listing created successfully");
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(()=>{
            toast.error("Failed to create listing");
        }).finally(() => {
            setIsLoading(false);
        });

    }

    const actionLabel = useMemo(()=> {
        if (step === STEPS.INFO){
            return 'Create'
        }
            return 'Next';
    },[step]);

    const secondaryActionLabel = useMemo(()=> {
        if (step === STEPS.CATEGORY){
            return undefined;
        }
            return 'Back';
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your speciality?"
                subtitle="Pick a Category"
            
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md: grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
            
            >
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category)=> setCustomValues('category',category)}
                            selected={category === item.label}
                            label={item.label}
                        />

                    </div>
                ))}

            </div>

        </div>
    )

    if (step === STEPS.LOCATION){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where will you be working?"
                    subtitle="Your location"
                
                />
                <CountrySelect
                    value={location}
                    onChange={(value)=> setCustomValues('location', value)}
                />

                <Map
                    center={location?.latlng}
                />
                <Input
                    id="car_model"
                    label="Area Of Operation in Kampala e.g Ntinda, Wandegeya, Makerere, etc"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.IMAGE){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add your Photo"
                    subtitle="Help the Client Identify you"
                
                />

                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValues('imageSrc', value)}
                />
                
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe yourself?"
                    subtitle="Keep it Short and sweet"
                
                />

                <Input
                    id="title"
                    label="Full Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Decription"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                
            </div>
        )
    }

    if (step === STEPS.INFO){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add your Contact Details"
                    subtitle="easily connect with your client"
                
                />

                <Input
                    id="contact"
                    label="e.g +256....."
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

                
            </div>
        )
    }


    return(
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel= {secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Add New Mechanic"
            disabled={false}
            body={bodyContent}
        />
    );
}

export default RentModal;