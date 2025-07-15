import React from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import TranscriptDisplay from "./TranscriptDisplay";

const Recorder: React.FC = () => {
  const { transcript, listening, startListening, stopListening, error } = useSpeechRecognition();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Voice Recorder & Live Transcription</h2>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={startListening}
          disabled={listening}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Start Recording
        </button>
        <button
          onClick={stopListening}
          disabled={!listening}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Stop Recording
        </button>
      </div>
      <TranscriptDisplay transcript={transcript} error={error} listening={listening} />
    </div>
  );
};

export default Recorder; 