import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface Props {
	params: { id: string };
}

export default async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: +params.id },
	});

	//we do not need to return notFound() because the return type is never
	//so it does not return any values
	if (!issue) notFound();

	return (
		<Grid columns={{ initial: '1', md: '2' }} gap="5">
			<Box>
				<IssueDetails issue={issue} />
			</Box>
			<Box>
				<EditIssueButton issueId={issue.id} />
			</Box>
		</Grid>
	);
};

/*
	we do not need to return notFound() because the return type is never
	so it does not return any values
  if (!issue) notFound();

*/
