/* 
import ErrorMessage from './ErrorMessage';
import IssueStatusBadge from './IssueStatusBadge';
import Link from './Link';
import Spinner from './Spinner';



So these are (separate) named exports

export { Link };
export { ErrorMessage };
export { IssueStatusBadge };
export { Spinner };
*/

//exporting the default object from './Link' module as link
export { default as Link } from './Link';
export { default as ErrorMessage } from './ErrorMessage';
export { default as IssueStatusBadge } from './IssueStatusBadge';
export { default as Spinner } from './Spinner';
export { default as Skeleton } from './Skeleton';
