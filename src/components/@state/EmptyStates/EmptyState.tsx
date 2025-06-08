import rocket from "assets/img/rocket.png";

import Button from "components/@button/Button";

interface Props {
  title: string;
  description: string;
  cta?: string;
  onClick?: () => void;
}

const EmptyStates = ({ title, description, cta, onClick }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <img src={rocket} alt="rocket" className="w-3/5 h-auto" />
      <h2 className="font-title font-semibold text-2xl text-neutral-50 pt-6">
        {title}
      </h2>
      <p className="text-neutral-50 text-center pt-3.5">{description}</p>
      {cta && <Button label={cta} className="w-full mt-10 p-3.5 sm:p-4" onClick={onClick} />}
    </div>
  );
};

export default EmptyStates;
