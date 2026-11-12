
import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { configure } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

configure({
  getElementError: (message) => {
    const summary = message?.split('\n\n')[0]
      ?? 'Testing Library query failed';

    return new Error(summary);
  },
});
