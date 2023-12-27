import { Box } from '@radix-ui/themes';
import React from 'react';
import { Skeleton } from '@/app/components';

export default () => {
	return (
		<Box className="max-w-xl">
			<Skeleton height="2rem" />
			<Skeleton height="20rem" />
		</Box>
	);
};
