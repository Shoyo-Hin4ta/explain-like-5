"use client";

import React, { useState, useRef } from 'react';
import { ApiResponse } from "@/types/ApiResponse";
import { IExplanation } from "@/model/Explanation.model";
import InputBox from '@/components/InputBox';
import CustomButton from '@/components/CustomButton';
import Explanations from '@/components/Explanations';
import { userInputValidation } from '@/schema/inputSchema';

const persistentState = {
  explanations: [] as IExplanation[]
};

export default function Home() {
  const [topic, setTopic] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [explanations, setExplanations] = useState<IExplanation[]>(persistentState.explanations);
  const [error, setError] = useState<string | null>(null);
  const [streamingExplanation, setStreamingExplanation] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');

  const explanationRef = useRef('');

  const handleSubmit = async () => {
    setError(null);
    
    const result = userInputValidation.safeParse({ topic, submitterName });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
  
    setLoading(true);
    setIsStreaming(true);
    setCurrentTopic(topic);
    setStreamingExplanation('');
    explanationRef.current = '';
  
    try {
      const response = await fetch('/api/explanations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: { topic, submitterName } }),
      });

      const data: ApiResponse<IExplanation> = await response.json();

      if (!data.success) {
        throw new Error(data.error?.details || 'Failed to fetch explanation');
      }

      if (data.data) {
        const newExplanation = data.data;
        let i = 0;
        const streamInterval = setInterval(() => {
          if (i < newExplanation.explanation.length) {
            explanationRef.current += newExplanation.explanation[i];
            setStreamingExplanation(explanationRef.current);
            i++;
          } else {
            clearInterval(streamInterval);
            setIsStreaming(false);
            setExplanations(prevExplanations => [newExplanation, ...prevExplanations]);
            persistentState.explanations = [newExplanation, ...explanations];
          }
        }, 20);
      } else {
        setError('No explanation data received. Please try again.');
      }

      setTopic('');
      setSubmitterName('');
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError('Failed to get explanation. Please try again.');
      setIsStreaming(false);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Explain Like I am <span className="text-indigo-600">Five</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get simple explanations for complex topics. Perfect for curious minds of all ages!
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="space-y-6">
            <InputBox
              value={topic}
              onChange={setTopic}
              label="Topic"
              placeholder="Enter a topic you're curious about"
              id="topic-input"
            />
            <InputBox
              value={submitterName}
              onChange={setSubmitterName}
              label="Your Name"
              placeholder="Tell us your name"
              id="submitter-name-input"
            />
            <CustomButton
              label={isStreaming ? "Streaming Explanation..." : loading ? "Getting Explanation..." : "Explain Like I'm 5"}
              onClick={handleSubmit}
              disabled={loading || isStreaming}
              className="w-full text-white py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200"
            />
          </div>
          {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
        </div>

        <Explanations
          explanations={explanations}
          streamingExplanation={streamingExplanation}
          isStreaming={isStreaming}
          currentTopic={currentTopic}
        />
      </div>
    </div>
  );
}