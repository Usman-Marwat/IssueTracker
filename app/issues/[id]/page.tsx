import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import authOptions from '@/app/auth/AuthOptions';
import prisma from '@/prisma/client';

interface Props {
	params: { id: string };
}

export default async ({ params }: Props) => {
	const session = await getServerSession(authOptions);

	const issue = await fetchUser(+params.id);

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', sm: '5' }} gap="5">
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction="column" gap="4">
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

const fetchUser = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } })
);

export async function generateMetadata({ params }: Props) {
	const issue = await fetchUser(+params.id);

	return {
		title: issue?.title,
		description: 'Details of issue ' + issue?.id,
	};
}

/* 
	we do not need to return notFound() because the return type is never
	so it does not return any values
  if (!issue) notFound();

*/
