import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import Pagination from '@/app/components/Pagination';
import IssueActions from './IssueActions';
import prisma from '@/prisma/client';

interface Props {
	searchParams: IssueQuery;
}

export default async ({ searchParams }: Props) => {
	const status = Object.values(Status).includes(searchParams.status)
		? searchParams.status
		: undefined;
	const where = { status };

	const orderBy = columnNames.includes(searchParams.orderBy)
		? { [searchParams.orderBy]: 'asc' }
		: undefined;

	const page = +searchParams.page || 1;
	const pageSize = 10;

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	});

	const issueCount = await prisma.issue.count({ where });

	return (
		<Flex direction="column" gap="3">
			<IssueActions />

			<IssueTable searchParams={searchParams} issues={issues} />

			<Pagination pageSize={10} currentPage={page} itemCount={issueCount} />
		</Flex>
	);
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Issue Tracker - Issue List',
	description: 'View all project issues',
};
