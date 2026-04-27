import Hero from './components/Hero';
import ScrollHint from './components/ScrollHint';
import TerminalConsole from './components/TerminalConsole';

function App() {
  return (
    <div className="page-shell">
      <Hero />
      <TerminalConsole />
      <ScrollHint />
    </div>
  );
}

export default App;
