interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const PrimaryButton = ({
  disabled,
  children,
  className,
}: Props): JSX.Element => {
  return (
    <button
      disabled={disabled}
      className={` text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 font-semibold rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};
