/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
	plugins: [react(), tailwindcss()],

	server: {
		port: 3000,
		host: '0.0.0.0',
	},

	test: {
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'json-summary', 'lcov'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'**/*.test.{ts,tsx}',
				'**/*.stories.tsx',
				'**/*.d.ts',
				'src/test/**',
				'src/types/**',
				'src/mocks/**',
				'src/main.tsx',
			],
		},

		projects: [
			// Component and unit tests
			{
				extends: true,
				test: {
					name: 'unit',
					environment: 'jsdom',
					setupFiles: ['./src/test/setup.ts'],
					include: ['src/**/*.test.{ts,tsx}'],
					exclude: ['src/test/integration/**'],
				},
			},

			// Page integration tests
			{
				extends: true,
				test: {
					name: 'integration',
					environment: 'jsdom',
					setupFiles: ['./src/test/setup.ts'],
					include: ['src/test/integration/**/*.test.{ts,tsx}'],
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
