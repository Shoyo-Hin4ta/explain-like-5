import React from 'react';
import { IExplanation } from "@/model/Explanation.model";

interface ExplanationsProps {
  explanations: IExplanation[];
  streamingExplanation: string;
  isStreaming: boolean;
  currentTopic: string;
}

const Explanations: React.FC<ExplanationsProps> = ({ explanations, streamingExplanation, isStreaming, currentTopic }) => {
  const hasExplanations = explanations.length > 0 || isStreaming;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Explanations</h2>
      
      {!hasExplanations ? (
        <div className="text-center py-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <p className="text-xl text-gray-600">No explanations generated yet.</p>
          <p className="mt-2 text-lg text-indigo-600">Enter a topic above to get started!</p>
        </div>
      ) : (
        <>
          {isStreaming && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentTopic}
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <p className="text-gray-700 leading-relaxed">{streamingExplanation}</p>
              </div>
            </div>
          )}

          {explanations.map((explanation, index) => (
            <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {explanation.topic}
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <p className="text-gray-700 leading-relaxed">{explanation.explanation}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Explanations;