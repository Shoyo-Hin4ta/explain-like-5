
const TableShimmer: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Topic</th>
            <th className="px-4 py-2 text-left">5-year-old Explanation</th>
            <th className="px-4 py-2 text-left">Submitter Name</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border px-4 py-2">
                <div className="h-4 bg-gray-200 rounded shimmer"></div>
              </td>
              <td className="border px-4 py-2">
                <div className="h-16 bg-gray-200 rounded shimmer"></div>
              </td>
              <td className="border px-4 py-2">
                <div className="h-4 bg-gray-200 rounded shimmer"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableShimmer;