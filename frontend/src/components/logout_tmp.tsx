import { memo } from 'react';
import type { FC } from 'react';
import '../styles/tasklist.css';
import { Props } from '../routes';

export const Logout: FC<Props> = memo(function Screen() {
  return (
	<div >
		<h1>Please Sign In</h1>
	</div>
    
  );
});

export default Logout;