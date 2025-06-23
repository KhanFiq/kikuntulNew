export default function EmptyState({ message = "Tidak ada data." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" /></svg>
      <div className="text-lg font-semibold">{message}</div>
    </div>
  );
}
