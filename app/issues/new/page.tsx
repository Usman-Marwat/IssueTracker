'use client';

import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	const { register, control, handleSubmit } = useForm<IssueForm>();

	return (
		<form
			className="max-w-xl space-y-3"
			onSubmit={handleSubmit(async (data) => {
				console.log(data);
				await axios.post('/api/issues', data);
				router.push('/issues');
			})}
		>
			<TextField.Root>
				<TextField.Input placeholder="Title" {...register('title')} />
			</TextField.Root>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<SimpleMDE placeholder="Description" {...field} />
				)}
			/>
			<Button>Submit New Issue</Button>
		</form>
	);
};

export default NewIssuePage;
