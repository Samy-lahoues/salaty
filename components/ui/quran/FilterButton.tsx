import { FilterType } from "@/constants";

interface FilterButtonProps {
    index: number;
    filter: FilterType;
    filterType: FilterType;
    onClick: () => void;
    text: string;
    isRTL?: boolean;
}

const FilterButton = ({
    index,
    filter,
    filterType,
    onClick,
    text,
    isRTL = false,
}: FilterButtonProps) => {
    const isActive = filter === filterType;

    return (
        <button
            onClick={onClick}
            className={`
        px-4 py-2 mx-1 rounded-lg transition-all duration-200 font-medium
        ${
            isActive
                ? "bg-accent text-white shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-accent/10"
        }
        ${isRTL ? "font-arabic" : "font-sans"}
        `}
        >
            {text}
        </button>
    );
};
export default FilterButton;
