import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';

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
		<div>
			<Heading>{issue.title}</Heading>
			<Flex gap={'3'} my="2">
				<IssueStatusBadge status={issue.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose" mt="4">
				<ReactMarkdown>{issue.description}</ReactMarkdown>
			</Card>
		</div>
	);
};
