import { useRouteError } from 'react-router';

export default function ErrorBoundary() {
  const routeError = useRouteError();

  return (
    <div className="container">
      <h1 className="h3 text-neutral-700">{routeError}</h1>
    </div>
  );
}
