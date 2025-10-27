import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

// Lazy load remote components
const Button = lazy(() => import('remoteCommon/Button'));
const Card = lazy(() => import('remoteCommon/Card'));

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to the Home Page
        </h2>
        <p className="text-lg text-gray-600">
          This is a remote microfrontend loaded from <code className="bg-gray-200 px-2 py-1 rounded">remote-home</code>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <ErrorBoundary>
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>}>
            <Card
              title="Card Component"
              description="This card is loaded from the remote-common microfrontend"
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  This demonstrates how components from different remotes can work together seamlessly.
                </p>
                <ErrorBoundary
                  fallback={
                    <div className="px-4 py-2 bg-gray-100 rounded text-sm text-gray-600">
                      Button unavailable
                    </div>
                  }
                >
                  <Suspense fallback={<div className="animate-pulse bg-gray-300 h-10 rounded"></div>}>
                    <Button onClick={() => alert('Button clicked!')}>
                      Click Me
                    </Button>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </Card>
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>}>
            <Card
              title="Another Card"
              description="Module Federation allows sharing components across applications"
            >
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Each microfrontend can be developed, deployed, and updated independently.
                </p>
                <ErrorBoundary
                  fallback={
                    <div className="px-4 py-2 bg-gray-100 rounded text-sm text-gray-600">
                      Button unavailable
                    </div>
                  }
                >
                  <Suspense fallback={<div className="animate-pulse bg-gray-300 h-10 rounded"></div>}>
                    <Button 
                      onClick={() => alert('Hello from the remote button!')}
                      variant="secondary"
                    >
                      Learn More
                    </Button>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </Card>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

