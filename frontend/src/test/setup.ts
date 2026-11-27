import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';
import { cleanup, configure } from '@testing-library/react';

// Provide missing HTMLDialogElement methods in jsdom.
if (!HTMLDialogElement.prototype.showModal) {
	HTMLDialogElement.prototype.showModal = function () {
		this.setAttribute('open', '');
	};
}

if (!HTMLDialogElement.prototype.close) {
	HTMLDialogElement.prototype.close = function (returnValue?: string) {
		if (!this.open) return;

		if (returnValue !== undefined) {
			this.returnValue = returnValue;
		}

		this.removeAttribute('open');
		this.dispatchEvent(new Event('close'));
	};
}

afterEach(() => {
	cleanup();
});

configure({
	getElementError: (message) => {
		const summary = message?.split('\n\n')[0] ?? 'Testing Library query failed';

		return new Error(summary);
	},
});
