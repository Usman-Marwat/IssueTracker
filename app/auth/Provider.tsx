'use client';

import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

export default ({ children }: PropsWithChildren) => {
	return <SessionProvider>{children}</SessionProvider>;
};
