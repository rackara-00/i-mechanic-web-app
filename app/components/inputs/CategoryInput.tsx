'use client';

interface CategoryInputProps {
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    label,
    selected,
    onClick
}) => {
    return (
        <div 
            onClick={() => onClick(label)}
            className={`
                rounded-xl
                border-2
                p-4
                flex
                flex-col
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? 'border-black' : 'border-neutral-200'}
            `}
        >
            <div>{label}</div> {/* Display the label inside the div */}
        </div>
    );
}

export default CategoryInput;
