export default function LoadingSpinner({
  loadingComment = 'Loading...',
}: {
  loadingComment?: string;
}) {
  return (
    <div className="py-4 text-center">
      <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500"></div>
      <p className="mt-2 text-gray-600">{loadingComment}</p>
    </div>
  );
}
