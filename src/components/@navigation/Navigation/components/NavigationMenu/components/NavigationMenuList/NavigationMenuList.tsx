import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const NavigationMenuList = ({ children }: Props) => {
  return <ul className="flex flex-col gap-2.5">{children}</ul>;
};

export default NavigationMenuList;
