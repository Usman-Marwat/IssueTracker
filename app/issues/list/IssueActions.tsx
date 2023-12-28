import Link from 'next/link';
import { Button, Flex } from '@radix-ui/themes';
import IssueStatusFilter from './IssueStatusFilter';

export default () => {
	return (
		<Flex mb="5" justify="between">
			<IssueStatusFilter />

			<Button>
				<Link href="/issues/new">New Issue</Link>
			</Button>
		</Flex>
	);
};
