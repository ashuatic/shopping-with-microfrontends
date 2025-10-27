import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/Button';
import Card from './components/Card';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-8">
      <ErrorBoundary>
        <div className="max-w-2xl w-full space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Common UI Components
          </h1>
          <p className="text-center text-gray-600">
            This remote provides reusable UI components
          </p>
          
          <div className="space-y-4">
            <Card
              title="Button Component Demo"
              description="Reusable button component with variants"
            >
              <div className="space-x-4">
                <Button onClick={() => alert('Primary clicked!')}>
                  Primary Button
                </Button>
                <Button 
                  onClick={() => alert('Secondary clicked!')}
                  variant="secondary"
                >
                  Secondary Button
                </Button>
              </div>
            </Card>

            <Card
              title="Card Component Demo"
              description="Reusable card component with header and content"
            >
              <p className="text-gray-600">
                These components can be imported and used in any microfrontend.
              </p>
            </Card>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;

