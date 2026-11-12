/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
		host: '0.0.0.0',
	},
	test: {
		// Coverage configuration
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html'],
			include: ['src/components/**/*.tsx'],
			exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
		},

		projects: [
			// Component unit tests
			{
				extends: true,
				test: {
					name: 'unit',
					environment: 'jsdom',
					setupFiles: ['./src/test/setup.ts'],
					include: ['src/**/*.test.{ts,tsx}'],
				},
			},

			// Storybook tests
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: path.join(import.meta.dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
				},
			},
		],
	},
});
