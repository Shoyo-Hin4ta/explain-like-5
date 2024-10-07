import React from 'react';
import CustomButton from './CustomButton';

interface SortButtonProps {
  currentSortBy: string;
  currentSortOrder: string;
  onSort: (sortBy: string, sortOrder: string) => void;
}

export default function SortButton({ currentSortBy, currentSortOrder, onSort }: SortButtonProps) {
  const handleSort = () => {
    let newSortBy, newSortOrder;

    if (currentSortBy === 'createdAt') {
      newSortBy = 'submitterName';
      newSortOrder = 'asc';
    } else if (currentSortBy === 'submitterName' && currentSortOrder === 'asc') {
      newSortBy = 'submitterName';
      newSortOrder = 'desc';
    } else {
      newSortBy = 'createdAt';
      newSortOrder = 'desc';
    }

    onSort(newSortBy, newSortOrder);
  };

  const getSortButtonText = () => {
    if (currentSortBy === 'createdAt') {
      return 'Sorted by Creation Date (Latest First)';
    } else if (currentSortBy === 'submitterName' && currentSortOrder === 'asc') {
      return 'Sorted by Submitter Name (A-Z)';
    } else {
      return 'Sorted by Submitter Name (Z-A)';
    }
  };

  return (
    <CustomButton
      label={getSortButtonText()}
      onClick={handleSort}
      className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    />
  );
}