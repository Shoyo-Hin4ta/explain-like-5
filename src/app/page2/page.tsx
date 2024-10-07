'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { IExplanation } from "@/model/Explanation.model";
import SortButton from '@/components/SortButton';
import { ApiResponse } from "@/types/ApiResponse";
import ExplanationTable from '@/components/ExplanationTable';
import { getExplanations } from '@/lib/explanationUtils';
import TableShimmer from '@/components/TableShimmer';

function Page2Content() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [explanationsData, setExplanationsData] = useState<ApiResponse<IExplanation[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExplanations = async () => {
      setIsLoading(true);
      try {
        const data = await getExplanations();
        setExplanationsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch explanations');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExplanations();
  }, []);

  const sortedExplanations = useMemo(() => {
    if (!explanationsData?.data) return [];
    return [...explanationsData.data].sort((a, b) => {
      if (sortBy === 'submitterName') {
        const compareResult = a.submitterName.localeCompare(b.submitterName, 'en', { sensitivity: 'base' });
        return sortOrder === 'asc' ? compareResult : -compareResult;
      } else if (sortBy === 'createdAt') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  }, [explanationsData, sortBy, sortOrder]);

  const handleSort = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explanation Catalog</h1>
      <div className="mb-4">
        <SortButton currentSortBy={sortBy} currentSortOrder={sortOrder} onSort={handleSort} />
      </div>
      {isLoading ? (
        <TableShimmer />
      ) : sortedExplanations.length === 0 ? (
        <p className="text-center py-4">No explanations done so far.</p>
      ) : (
        <ExplanationTable explanations={sortedExplanations} />
      )}
    </div>
  );
}

function Page2() {
  return (
    <Suspense fallback={<TableShimmer />}>
      <Page2Content />
    </Suspense>
  );
}

export default Page2;