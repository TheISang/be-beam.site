export default function MyPageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] items-start gap-16 pt-35 pb-24">
      {children}
    </div>
  );
}
