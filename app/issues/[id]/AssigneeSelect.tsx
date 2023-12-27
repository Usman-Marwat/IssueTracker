'use client';

import { Select } from '@radix-ui/themes';

export default () => {
	return (
		<Select.Root>
			<Select.Trigger placeholder="Assign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value="1">Mosh Hamedani</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};
