import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default ({ issueId }: { issueId: number }) => {
	return (
		<Button>
			<Pencil2Icon />
			<Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
		</Button>
	);
};
