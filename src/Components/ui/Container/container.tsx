interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps): JSX.Element => {
  return (
    <div
      className={`px-4 md:px-8 mx-auto  flex flex-col lg:max-w-[70rem] ${className}`}
    >
      {children}
    </div>
  );
};
export default Container;
