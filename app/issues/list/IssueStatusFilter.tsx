'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' },
];

export default () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filter = (status: string) => {
		const params = new URLSearchParams();
		if (status) params.append('status', status);
		if (searchParams.get('orderBy'))
			params.append('orderby', searchParams.get('orderBy')!);

		const query = params.size ? `?${params.toString()}` : '';
		router.push(`/issues/list/${query}`);
	};

	return (
		<Select.Root
			onValueChange={filter}
			defaultValue={searchParams.get('status') || 'All'}
		>
			<Select.Trigger placeholder="Filter by status..." />
			<Select.Content>
				{statuses.map((status) => (
					<Select.Item key={status.value} value={status.value || 'All'}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};
