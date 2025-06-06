import { FieldErrors, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

import IconButton from 'components/@button/IconButton';
import { PlusIcon } from 'components/@icon';
import { CloseIcon } from 'components/@icon/CloseIcon';

interface Tag {
  id: string;
  name: string;
}

interface Props<T extends Record<string, unknown>> {
  name: Path<T>;
  tags: Tag[];
  onAddTag: () => void;
  onRemoveTag: (tagId: string) => void;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
}

const TagsField = <T extends Record<string, unknown>>({
  name,
  tags,
  onAddTag,
  onRemoveTag,
  errors,
  register,
  validation,
}: Props<T>) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <label className="font-medium text-neutral-100">Genres</label>
      <input
        type="hidden"
        value={tags.map((tag) => tag.id).join(',')}
        {...register(name, validation)}
      />
      <div className="w-full flex flex-wrap items-center gap-1.5">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 text-primary-500 bg-primary-500/20 border border-primary-500/50 rounded-lg px-3.5 pt-2.5 pb-2"
          >
            <span className="font-semibold text-sm leading-none pb-0.5">{tag.name}</span>
            <IconButton
              icon={CloseIcon}
              className="w-4 h-4 bg-transparent p-0"
              onClick={() => onRemoveTag(tag.id)}
            />
          </div>
        ))}
        {tags.length === 0 && (
          <div
            className="flex items-center gap-2 text-neutral-500 bg-secondary-700 border border-neutral-500 rounded-lg px-3.5 pt-2.5 pb-2"
            onClick={onAddTag}
          >
            <span className="font-semibold text-sm leading-none pb-0.5">No tags added...</span>
          </div>
        )}
        <IconButton
          icon={PlusIcon}
          className="w-[38px] h-[38px] text-primary-500 bg-secondary-800 border-2 border-primary-500/20 shadow-md p-1.5 ml-0.5"
          onClick={onAddTag}
        />
      </div>
      <div className="min-h-4 w-full">
        {errors[name] && (
          <p className="text-xs text-red-500">{errors[name]?.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default TagsField;
