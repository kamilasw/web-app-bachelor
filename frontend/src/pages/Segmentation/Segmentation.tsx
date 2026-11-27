import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { Input } from '../../components/ui/Input/Input';
import { Toast } from '../../components/ui/Toast/Toast';
import type { ToastProps } from '../../components/ui/Toast/Toast';

import { SegmentationRequestModal } from '../../components/segmentation/SegmentationRequestModal/SegmentationRequestModal';
import { SegmentationRunsTable } from '../../components/segmentation/SegmentationRunsTable/SegmentationRunsTable';

import { algorithms } from '../../mocks/algorithms';
import { runs as initialRuns } from '../../mocks/runs';

import type {
	SegmentationRequest,
	SegmentationRun,
} from '../../types/segmentation';

export function Segmentation() {
	const [runs, setRuns] = useState(initialRuns);
	const [modalOpen, setModalOpen] = useState(false);
	const [search, setSearch] = useState('');

	const [toast, setToast] = useState<Omit<ToastProps, 'onDismiss'> | null>(
		null,
	);

	const filteredRuns = runs.filter((run) => {
		const algorithmName =
			algorithms.find((algorithm) => algorithm.id === run.algorithm)?.name ??
			run.algorithm;

		return `${run.name} ${algorithmName}`
			.toLowerCase()
			.includes(search.trim().toLowerCase());
	});

	const handleRequest = (request: SegmentationRequest) => {
		// todo - add backend connection
		console.log('Segmentation request:', request);

		const runId = crypto.randomUUID();

		const run: SegmentationRun = {
			run_id: runId,
			client_id: 'client-001',
			name: request.name,
			algorithm: request.algorithm,
			filepath: `client-001/${runId}.json`,
		};

		setRuns((previous) => [run, ...previous]);
		setModalOpen(false);

		setToast({
			title: 'Mock run created',
			description: 'The run has been added to the local overview.',
			appearance: 'success',
		});
	};

	const handleView = (run: SegmentationRun) => {
		// todo - add backend and results interface
		setToast({
			title: 'Results unavailable',
			description: `Results for "${run.name}" are not available yet.`,
			appearance: 'default',
		});
	};

	const handleDownload = (run: SegmentationRun) => {
		// todo - get file from backend
		console.log('Download:', run.filepath);

		setToast({
			title: 'Download unavailable',
			description: 'Result files will be available after backend integration.',
			appearance: 'default',
		});
	};

	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold">Segmentation</h1>

					<p className="mt-1 text-muted">
						Create and manage your segmentation runs.
					</p>
				</div>

				<Button
					appearance="primary"
					icon={Plus}
					onClick={() => setModalOpen(true)}
				>
					New request
				</Button>
			</div>

			<Card className="flex flex-col gap-4">
				<h2 className="text-lg font-semibold">Segmentation runs</h2>

				<div className="w-full max-w-sm">
					<Input
						label="Search runs"
						placeholder="Search by name or algorithm"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
				</div>

				<SegmentationRunsTable
					runs={filteredRuns}
					algorithms={algorithms}
					onView={handleView}
					onDownload={handleDownload}
				/>

				<p className="text-sm text-muted">
					{filteredRuns.length} of {runs.length} runs
				</p>
			</Card>

			{modalOpen && (
				<SegmentationRequestModal
					open={modalOpen}
					algorithms={algorithms}
					onClose={() => setModalOpen(false)}
					onSubmit={handleRequest}
				/>
			)}

			{toast && <Toast {...toast} onDismiss={() => setToast(null)} />}
		</div>
	);
}
