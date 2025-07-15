import { useState, useRef, useCallback } from "react";

// TypeScript type definitions for Web Speech API
// These are not included by default in TypeScript
// so we define minimal types here

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

interface UseSpeechRecognitionResult {
  transcript: string;
  listening: boolean;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const getRecognition = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Web Speech API is not supported in this browser.");
      return null;
    }
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece;
          } else {
            interimTranscript += transcriptPiece;
          }
        }
        setTranscript(finalTranscript + interimTranscript);
      };
      recognitionRef.current.onerror = (event: any) => {
        setError(event.error || "Speech recognition error");
        setListening(false);
      };
      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }
    return recognitionRef.current;
  }, []);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript("");
    const recognition = getRecognition();
    if (recognition) {
      recognition.start();
      setListening(true);
    }
  }, [getRecognition]);

  const stopListening = useCallback(() => {
    const recognition = getRecognition();
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  }, [getRecognition]);

  return { transcript, listening, startListening, stopListening, error };
} 