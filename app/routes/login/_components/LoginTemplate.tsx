export const LoginTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-18 lg:pt-25">
      {children}
    </div>
  );
};
