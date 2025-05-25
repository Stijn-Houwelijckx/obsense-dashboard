interface Props {
  title: string;
}

const AuthenticationFormTitle = ({ title }: Props) => {
  return (
    <h2 className="font-title font-semibold text-2xl pb-2.5 sm:pb-3.5 xl:pb-6">
      {title}
    </h2>
  );
};

export default AuthenticationFormTitle;
