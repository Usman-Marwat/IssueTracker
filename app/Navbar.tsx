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
import { Skeleton } from '@/app/components';

export default () => {
	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex justify="between">
					<NavLinks />

					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const NavLinks = () => {
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
								'nav-link': true,
								'!text-zinc-900': link.href === currentPath,
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

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === 'loading') return <Skeleton width="3rem" />;

	if (status === 'unauthenticated')
		return (
			<Link className="nav-link" href="/api/auth/signin">
				Login
			</Link>
		);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						src={session!.user!.image!}
						fallback="?"
						size="2"
						radius="full"
						className="cursor-pointer"
					/>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size="2">{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link href="/api/auth/signout">Log out</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};
