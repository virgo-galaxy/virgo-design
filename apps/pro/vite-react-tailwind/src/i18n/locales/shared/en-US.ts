export const sharedEnUS = {
  gender: { male: 'Male', female: 'Female' },
  workLocation: 'Work location',
  copy: {
    copy: 'Copy',
    copied: 'Copied',
    failed: 'Copy failed',
    copyValue: 'Copy {{value}}',
  },
  startup: {
    error: 'The workspace could not start',
    storage: 'Allow this site to access browser storage, then retry.',
    failed: 'Check your connection and site permissions, then retry.',
  },
  remote: {
    loading: 'Loading data…',
    error: 'Unable to load data',
    failed: 'The request failed. Please try again.',
    retry: 'Retry',
    timeout: 'The request timed out. Please try again.',
    network: 'Check your connection and try again.',
    saving: 'Saving…',
    saveError: 'Unable to save',
  },

  unassigned: 'Unassigned',
  tryABroaderSearchOrResetTheFilters: 'Try a broader search or reset the filters.',
  resetFilters: 'Reset filters',
  noResults: 'No results match this view',
} as const;
