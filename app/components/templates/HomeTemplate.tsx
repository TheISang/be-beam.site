export default function HomeTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center pt-20">{children}</div>
  );
}
