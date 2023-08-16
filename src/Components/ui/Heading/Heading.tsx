interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Title = ({ children, className }: Props): JSX.Element => {
  return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
};

export const Subtitle = ({ children, className }: Props): JSX.Element => {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
};

export const P = ({ children, className }: Props): JSX.Element => {
  return <p className={`text-gray-400 ${className}`}>{children}</p>;
};
