import { NextRequest as req, NextResponse as res } from 'next/server';
import { getServerSession } from 'next-auth';
import { issueSchema } from '@/app/validationSchemas';
import authOptions from '@/app/auth/AuthOptions';
import prisma from '@/prisma/client';

interface Params {
	params: { id: string };
}

export async function PATCH(request: req, { params }: Params) {
	const session = await getServerSession(authOptions);
	if (!session) return res.json({}, { status: 401 });

	const body = await request.json();
	const v = issueSchema.safeParse(body);
	if (!v.success) return res.json(v.error.format(), { status: 400 });

	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });
	if (!issue) return res.json({ error: 'Invalid issue' }, { status: 404 });

	const updatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: { title: body.title, description: body.description },
	});

	return res.json(updatedIssue);
}

export async function DELETE(request: req, { params }: Params) {
	const session = await getServerSession(authOptions);
	if (!session) return res.json({}, { status: 401 });

	const issue = await prisma.issue.findUnique({ where: { id: +params.id } });
	if (!issue) return res.json({ error: 'Invalid issue' }, { status: 404 });

	await prisma.issue.delete({ where: { id: issue.id } });
	return res.json({});
}
