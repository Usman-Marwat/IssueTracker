import { notFound } from 'next/navigation';
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
		<div>
			<p>{issue.title}</p>
			<p>{issue.description}</p>
			<p>{issue.status}</p>
			<p>{issue.createdAt.toDateString()}</p>
		</div>
	);
};
