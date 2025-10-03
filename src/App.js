import './App.css';
import Routes from './Admin_Panel_Frontend/Router/Routes';
import ErrorBoundary from './Admin_Panel_Frontend/Components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
