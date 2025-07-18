import { DeleteButton } from "./DeleteButton";

type Props = Task & {
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const Item = (props: Props) => {
  const { header } = props;

  if (header.length === 0 || header.length >= 32) {
    return null;
  }

  return (
    <li className="item-wrapper">
      <input
        type="checkbox"
        id={props.id}
        defaultChecked={props.done}
        onChange={() => props.onToggle(props.id)}
      />
      <label htmlFor={props.id} onClick={() => props.onToggle(props.id)}>
        {props.done ? <s>{props.header}</s> : props.header}
      </label>
      <DeleteButton
        disabled={!props.done}
        onClick={() => props.onDelete(props.id)}
      />
    </li>
  );
};
