import clsx from "clsx";

export const ListContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div className={clsx("overflow-y-auto", className)}>
      <div className="text-left bg-white shadow sm:rounded-md w-[calc(100vw_-_10rem)]">
        {children}
      </div>
    </div>
  );
};
