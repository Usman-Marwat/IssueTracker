import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	href: string;
}

export default ({ href, children }: Props) => {
	return (
		<NextLink href={href} passHref legacyBehavior>
			<RadixLink>{children}</RadixLink>
		</NextLink>
	);
};
