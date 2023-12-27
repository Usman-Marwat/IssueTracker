'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import Link from 'next/link';
import classnames from 'classnames';

export default () => {
	const { status, data: session } = useSession();

	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex justify="between">
					<MenuButtons />

					<AuthButtons status={status} />
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

const AuthButtons = ({ status }: { status: string }) => {
	return (
		<Box>
			{status === 'authenticated' && (
				<Link href="/api/auth/signout">Log out</Link>
			)}
			{status === 'unauthenticated' && (
				<Link href="/api/auth/signin">Login</Link>
			)}
		</Box>
	);
};
