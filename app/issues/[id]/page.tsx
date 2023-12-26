import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';

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
				<Heading>{issue.title}</Heading>
				<Flex className="space-x-3" my="2">
					<IssueStatusBadge status={issue.status} />
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card className="prose" mt="4">
					<ReactMarkdown>{issue.description}</ReactMarkdown>
				</Card>
			</Box>
			<Box>
				<Button>
					<Pencil2Icon />
					<Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
				</Button>
			</Box>
		</Grid>
	);
};
