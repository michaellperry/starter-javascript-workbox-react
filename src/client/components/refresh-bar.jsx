import * as React from 'react';
import { withRefresh } from './service-worker-container';

export const RefreshBar = withRefresh(({ refresh, ignore }) => (
  <div className="refresh-bar">
    <span>A new version of this application is available.</span>
    <button onClick={refresh}>Refresh</button>
    <button onClick={ignore}>Ignore</button>
  </div>
));
