import { isRouteErrorResponse, useRouteError } from 'react-router';

import { RouteErrorPage } from '@/views/RouteErrorPage';

export function RouteErrorBoundary() {
  const error = useRouteError();
  return <RouteErrorPage notFound={isRouteErrorResponse(error) && error.status === 404} />;
}
