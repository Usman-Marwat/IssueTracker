import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

interface Props {
	params: { id: string };
}

export default async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: { id: +params.id },
	});

	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};
