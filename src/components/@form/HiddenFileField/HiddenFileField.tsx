import { forwardRef } from 'react';

interface Props {
  name: string;
  accept: string;
  onChange: (file: File) => void;
}

const HiddenFileField = forwardRef<HTMLInputElement, Props>(({ name, accept, onChange }, ref) => {
  return (
    <input
      ref={ref}
      name={name}
      type="file"
      className="hidden"
      accept={accept}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        onChange(file);
      }}
    />
  );
});

export default HiddenFileField;
