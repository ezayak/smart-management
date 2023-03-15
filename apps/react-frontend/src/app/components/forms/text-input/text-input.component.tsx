import { ChangeEvent, useState, FC } from 'react';
import './text-input.style.scss';

interface ITextInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  className?: string;
  type?: string;
  onChange?: (value: string, id: string) => void;
}

const TextInput: FC<ITextInputProps> = ({
  id,
  label,
  placeholder,
  value,
  className = '',
  type,
  onChange,
}: ITextInputProps) => {
  const [curValue, setValue] = useState(value);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (onChange) {
      onChange(e.target.value, id);
    }
  };

  return (
    <div className={`text-input ${className}`}>
      {label && <label htmlFor={`input-id-${id}`}>{label}</label>}
      <input
        type={type ? type : 'text'}
        placeholder={placeholder}
        id={`input-id-{$id}`}
        value={curValue}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export { TextInput };
