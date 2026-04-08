import { JSX } from 'react';
import Input from '../interfaces/Input';

interface Props {
  props: Input;
}

const InputBase = ({ props }: Props): JSX.Element => {
  return (
    <input
      className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md"
      {...props}
    />
  );
};

export default InputBase;
