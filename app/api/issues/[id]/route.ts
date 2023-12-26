import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest as req, NextResponse as res } from 'next/server';

interface Params {
	params: { id: string };
}

export async function PATCH(request: req, { params }: Params) {
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
