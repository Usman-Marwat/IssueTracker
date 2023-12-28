import { Grid, Flex } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import IssueChart from './IssueChart';
import LatestIssues from './LatestIssues';

export default async function Home({
	searchParams,
}: {
	searchParams: { page: string };
}) {
	const open = await prisma.issue.count({ where: { status: 'OPEN' } });
	const ip = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
	const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap="5">
			<Flex direction="column" gap="5">
				<IssueSummary open={open} inProgress={ip} closed={closed} />
				<IssueChart open={open} inProgress={ip} closed={closed} />
			</Flex>
			<LatestIssues />
		</Grid>
	);
}
