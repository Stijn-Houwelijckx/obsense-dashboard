import { cn } from "utils/cn";

interface Props {
  message?: string;
  lineClassName?: string;
}

const HorizontalDivider = ({ message, lineClassName }: Props) => {
  return (
    <div className="w-full flex items-center gap-2.5">
      <div
        className={cn(
          "h-0.5 flex-1 rounded-full bg-neutral-100/10",
          lineClassName
        )}
      ></div>
      {message && (
        <>
          <span className="text-xs text-neutral-300 sm:text-sm">{message}</span>
          <div
            className={cn(
              "h-0.5 flex-1 rounded-full bg-neutral-100/10",
              lineClassName
            )}
          ></div>
        </>
      )}
    </div>
  );
};

export default HorizontalDivider;
