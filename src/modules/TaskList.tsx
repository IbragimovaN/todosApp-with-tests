import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { FilterButton } from "src/components/FilterBtn";
import { List } from "src/components/List";
import { deleteTask, tasksSelector, toggleTask } from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const handleFiltered = () => {
    setIsFilter((prev) => !prev);
  };

  return (
    <>
      <FilterButton
        onClick={handleFiltered}
        disabled={items.length === 0}
        isFilter={isFilter}
      />
      {items.length > 0 ? (
        <List
          items={isFilter ? items.filter((item) => item.done === false) : items}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};
