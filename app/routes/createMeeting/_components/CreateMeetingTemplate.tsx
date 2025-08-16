export default function CreateMeetingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[980px] pt-41 pb-16">{children}</div>
  );
}
