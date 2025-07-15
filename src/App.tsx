import Recorder from "./components/Recorder";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center">
      <Recorder />
      <footer className="mt-10 text-gray-500 text-sm text-center">
        Built with React, Vite, and Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
