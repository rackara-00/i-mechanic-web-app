'use client';

import Container from "../Container";
import { BiAtom } from 'react-icons/bi';

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: 'Engine',
    icon: BiAtom,
    description: ' specialists in Engine repair'
  },
  {
    label: 'Transmission',
    icon: BiAtom,
    description: ' focus on the repair and maintenance of vehicle transmissions.'
  },
  {
    label: 'Brake',
    icon: BiAtom,
    description: ' Specialize in the repair and maintenance of braking systems.'
  },
  {
    label: 'Suspension & Steering',
    icon: BiAtom,
    description: ' Focus on maintaining and repairing the vehicle suspension and steering systems'
  },
  {
    label: 'Electrical',
    icon: BiAtom,
    description: ' Specialize in diagnosing and repairing electrical issues in vehicles.'
  },
  {
    label: 'Exhaust',
    icon: BiAtom,
    description: 'Focus on the repair and maintenance of exhaust systems.'
  },
  {
    label: 'HVAC',
    icon: BiAtom,
    description: 'Specialize in the repair and maintenance of vehicle climate control systems.'
  },
  {
    label: 'Tire & Wheel',
    icon: BiAtom,
    description: ' Focus on tire installation, repair, and wheel-related services.'
  },
  {
    label: 'Fuel',
    icon: BiAtom,
    description: ' Specialize in diagnosing and repairing issues related to the fuel system.'
  },
  {
    label: 'Auto Body',
    icon: BiAtom,
    description: ' Focus on the repair and restoration of vehicle bodies.'
  },
  {
    label: 'Diagnostics & Emissions',
    icon: BiAtom,
    description: ' Specialize in vehicle diagnostics and emissions testing.'
  },
  {
    label: 'Hybrid & Electric',
    icon: BiAtom,
    description: 'Focus on the unique systems in hybrid and electric vehicles.'
  },

];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                
                />
            
            ))}
        </div>
        </Container>
    );
};

export default Categories;