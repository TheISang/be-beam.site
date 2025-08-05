export const LoginTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-25 flex h-[calc(100vh-100px)] flex-col items-center justify-center bg-white">
      {children}
    </div>
  );
};
