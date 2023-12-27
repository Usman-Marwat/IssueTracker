'use client';

import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Text,
} from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import Link from 'next/link';
import classnames from 'classnames';
import { Session } from 'next-auth';

export default () => {
	const { status, data: session } = useSession();

	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex justify="between">
					<MenuButtons />

					<AuthButtons status={status} session={session} />
				</Flex>
			</Container>
		</nav>
	);
};

const MenuButtons = () => {
	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues/list' },
	];

	return (
		<Flex align="center" gap="3">
			<Link href="/">
				<AiFillBug />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link) => (
					<li key={link.href}>
						<Link
							className={classnames({
								'text-zinc-900': link.href === currentPath,
								'text-zinc-500': link.href !== currentPath,
								'hover:text-zinc-800 transition-colors': true,
							})}
							href={link.href}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</Flex>
	);
};

const AuthButtons = ({
	status,
	session,
}: {
	status: string;
	session: Session | null;
}) => {
	return (
		<Box>
			{status === 'authenticated' && session && (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar
							src={session.user!.image!}
							fallback="?"
							size="2"
							radius="full"
							className="cursor-pointer"
						/>
					</DropdownMenu.Trigger>

					<DropdownMenu.Content>
						<DropdownMenu.Label>
							<Text size="2">{session.user!.email}</Text>
						</DropdownMenu.Label>
						<DropdownMenu.Item>
							<Link href="/api/auth/signout">Log out</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			)}

			{status === 'unauthenticated' && (
				<Link href="/api/auth/signin">Login</Link>
			)}
		</Box>
	);
};
