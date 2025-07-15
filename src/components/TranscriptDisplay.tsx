import React from "react";

interface TranscriptDisplayProps {
  transcript: string;
  error?: string | null;
  listening: boolean;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, error, listening }) => {
  return (
    <div className="min-h-[100px] border rounded p-4 bg-gray-50 text-gray-800">
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : transcript ? (
        <span>{transcript}</span>
      ) : (
        <span className="text-gray-400">{listening ? "Listening..." : "Transcript will appear here."}</span>
      )}
    </div>
  );
};

export default TranscriptDisplay; 