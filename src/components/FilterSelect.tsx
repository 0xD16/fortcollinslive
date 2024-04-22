import { useState } from "preact/hooks";
import { clsx } from "../utils";

const filterOptions = [
  "All Events",
  "Free",
  "Free-ish",
  "$5-10",
  "$11-20",
  "$21+",
];

const FilterSelect = ({
  onFilterChange,
  filter,
}: {
  filter: string;
  onFilterChange: (filter: string) => void;
}) => {
  const [filterShown, setFilterShown] = useState(false);
  return (
    <div>
      <div
        class={clsx("w-32 text-md cursor-pointer")}
        onClick={() => {
          setFilterShown(!filterShown);
        }}
      >
        Filter ({filter})
      </div>
      <div>
        {filterShown && (
          <div
            class={clsx(
              "flex flex-col items-center",
              "justify-center w-32 border-slate-400 border-t-2 border-r-2 border-b-2",
              "rounded-md bg-white absolute z-10 top-10 right-0 shadow-md "
            )}
          >
            {filterOptions.map((option) => (
              <div
                class={clsx(
                  "w-full text-center border-b-2 border-slate-400 cursor-pointer",
                  filter === option ? "bg-slate-400 text-white" : "bg-white"
                )}
                onClick={() => {
                  onFilterChange(option);
                  setFilterShown(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSelect;
