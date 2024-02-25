import { memo } from 'react';
import type { FC } from 'react';
import '../styles/tasklist.css';
import { Row, Button, Container, Col, Stack } from 'react-bootstrap';

interface Props {
  className?: string;
}

export const Tasklist: FC<Props> = memo(function Screen(props = {}) {
  return (
	<div className='background'>
		<Stack gap={3} className='tasklist'>
			<div className="text-fff-48px-OpenSans manageInventory">Manage Inventory</div>
			<div className="viewUpdateInventory">
				<Button className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true" >
					<a href='./'>View/Update Inventory</a>
				</Button>
			</div>
			<div className="getShoppingList">
				<Button className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true">
					<a href='./'>Get Shopping List</a>
				</Button>
			</div>
			<div className="text-fff-48px-OpenSans finance">Finance</div>
			<div className="transactionHistory">
				<Button className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true">
					<a href='./'>Transaction History</a>
				</Button>
			</div>
			<div className="reimbursementRequest">
				<Button className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true">
					<a href='./'>Reimbursement Request</a>
				</Button>
			</div>
			<div className="logout">
				<Button className='button-d9c4e3-24px-OpenSans' type="button" aria-pressed="true">
					<a href='./'>Logout</a>
				</Button>
			</div>
		</Stack>
	</div>
    
  );
});

export default Tasklist;