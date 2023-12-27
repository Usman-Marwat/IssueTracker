import prisma from '@/prisma/client';
import { NextRequest as req, NextResponse as res } from 'next/server';

export async function GET(request: req) {
	const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
	return res.json(users);
}
