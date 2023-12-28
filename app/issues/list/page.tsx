import { Table } from '@radix-ui/themes';
import { Link, IssueStatusBadge } from '../../components';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import prisma from '@/prisma/client';
import IssueActions from './IssueActions';

const columns: {
	label: string;
	value: keyof Issue;
	className?: string;
}[] = [
	{ label: 'Issue', value: 'title' },
	{
		label: 'Status',
		value: 'status',
		className: 'hidden md:table-cell',
	},
	{
		label: 'Created',
		value: 'createdAt',
		className: 'hidden md:table-cell',
	},
];

interface Props {
	searchParams: { status: Status; orderBy: keyof Issue };
}

export default async ({ searchParams }: Props) => {
	const status = Object.values(Status).includes(searchParams.status)
		? searchParams.status
		: undefined;
	const orderBy = columns.map((col) => col.value).includes(searchParams.orderBy)
		? { [searchParams.orderBy]: 'asc' }
		: undefined;

	const issues = await prisma.issue.findMany({
		where: { status },
		orderBy,
	});

	return (
		<>
			<IssueActions />

			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								key={column.value}
								className={column.className}
							>
								<NextLink
									href={{ query: { ...searchParams, orderBy: column.value } }}
								>
									{column.label}
								</NextLink>
								{column.value === searchParams.orderBy && (
									<ArrowUpIcon className="inline" />
								)}
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className="block md:hidden">
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</>
	);
};

export const dynamic = 'force-dynamic';
