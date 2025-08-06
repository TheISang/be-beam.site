export default function MyPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] gap-16 pt-10 pb-24">
      {children}
    </div>
  );
}
