export default function SkeletonCard() {
  return (
    <div className="bg-white shadow-lg p-4 flex flex-col border border-blue-100 rounded-xl animate-pulse">
      <div className="mb-2 rounded h-40 w-full bg-blue-100" />
      <div className="h-5 bg-blue-100 rounded w-3/4 mb-2" />
      <div className="h-4 bg-blue-100 rounded w-1/2 mb-2" />
      <div className="h-6 bg-purple-100 rounded w-2/3 mb-4" />
      <div className="h-10 bg-blue-100 rounded w-full" />
    </div>
  );
}
