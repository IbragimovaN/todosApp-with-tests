type Props = {
  onClick: () => void;
  disabled: boolean;
  isFilter: boolean;
};
export const FilterButton = ({ onClick, disabled, isFilter }: Props) => {
  return (
    <button
      className="button"
      onClick={onClick}
      disabled={disabled}
      data-testid="filter-button"
    >
      {isFilter ? "все задачи" : "не выполненные"}
    </button>
  );
};
