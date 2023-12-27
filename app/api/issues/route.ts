import { NextRequest as req, NextResponse as res } from 'next/server';
import { getServerSession } from 'next-auth';
import { issueSchema } from '../../validationSchemas';
import authOptions from '@/app/auth/AuthOptions';
import prisma from '@/prisma/client';

export async function POST(request: req) {
	const session = await getServerSession(authOptions);
	if (!session) return res.json({}, { status: 401 });

	const body = await request.json();
	const v = issueSchema.safeParse(body);
	if (!v.success) return res.json(v.error.format(), { status: 400 });

	const newIssue = await prisma.issue.create({
		data: { title: body.title, description: body.description },
	});

	return res.json(newIssue, { status: 201 });
}
