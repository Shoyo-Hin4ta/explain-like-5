import React from "react";

const ExplanationShimmer: React.FC = () => {
    return (
        <div className="flex justify-center items-center space-x-2 my-4">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
    );
  }
  
export default ExplanationShimmer;