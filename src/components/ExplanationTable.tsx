import { IExplanation } from "@/model/Explanation.model";

export default function ExplanationTable({ explanations }: { explanations: IExplanation[] }) {
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
          {explanations.map((explanation, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="border px-4 py-2">{explanation.topic}</td>
              <td className="border px-4 py-2">
                <div className="max-h-24 overflow-y-auto">{explanation.explanation}</div>
              </td>
              <td className="border px-4 py-2">{explanation.submitterName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}