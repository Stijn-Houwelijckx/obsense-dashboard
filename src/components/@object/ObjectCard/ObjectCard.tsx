import { ObjectItem } from 'types/object.types';
import { cn } from 'utils/cn';

interface Props {
  object: ObjectItem;
  isSelected?: boolean;
  onSelect?: () => void;
}

const ObjectCard = ({ object, isSelected, onSelect }: Props) => {
  return (
    <article
      key={object._id}
      className={cn(
        'flex flex-col gap-4 bg-secondary-800 rounded-lg p-4 cursor-pointer',
        isSelected && 'border-2 border-primary-500/20',
      )}
      onClick={onSelect}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <img src={object.thumbnail.filePath} alt={object.title} className="w-full h-full object-cover" />
        {onSelect && (
          <div className="absolute inset-x-2.5 inset-y-2.5 flex justify-end items-start">
            <div className="w-8 h-8 flex items-center justify-center bg-secondary-700 border-2 border-neutral-200/20 rounded-full shadow-lg p-1">
              <div className={cn('w-full h-full rounded-full', isSelected ? 'bg-primary-500' : 'bg-transparent')} />
            </div>
          </div>
        )}
      </div>
      <div className="min-h-16 flex justify-between items-center bg-secondary-700 rounded-lg p-2.5 px-4">
        <h3 className="font-title font-semibold text-xl text-primary-500 tracking-wide truncate pt-0.5">
          {object.title}
        </h3>
      </div>
    </article>
  );
};

export default ObjectCard;
