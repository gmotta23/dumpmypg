export const ListContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-y-auto h-[calc(100vh_-_15rem)]">
      <div className="text-left bg-white shadow sm:rounded-md w-[calc(100vw_-_10rem)]">
        {children}
      </div>
    </div>
  );
};
