export default function Loading() {
  return (
    <div className="p-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-48 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-64 mb-8"></div>
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
          <div className="border p-4 rounded">
            <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}