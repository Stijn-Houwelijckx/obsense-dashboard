interface Props {
  value?: number;
  maxValue?: number;
}

const ProgressBar = ({ value = 1, maxValue = 1 }: Props) => {
  return (
    <div className="h-2.5 flex items-center relative xl:hidden">
      <div className="h-3/4 absolute inset-x-0 bg-primary-500/20 rounded-full"></div>
      <div
        className="absolute inset-0 bg-primary-500 rounded-full transition-all duration-500 ease-in-out"
        style={{
          width: `${(value / maxValue) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
