import { memo } from 'react';
import type { FC } from 'react';
import '../styles/tasklist.css';
import { Row, Button, Container, Col, Stack } from 'react-bootstrap';

interface Props {
  className?: string;
}
/* @figmaId 55:4 */
export const Tasklist: FC<Props> = memo(function Screen(props = {}) {
  return (
	<div className='background'>
		<Stack gap={3} className='tasklist'>
			<div className="manageInventory">Manage Inventory</div>
			<div className="viewUpdateInventory">
				<Button className='viewUpdateInventoryButton' type="button" aria-pressed="true">
					<a href='./'>View/Update Inventory</a>
				</Button>
			</div>
			<div className="getShoppingList">
				<Button className='getShoppingListButton' type="button" aria-pressed="true">
					<a href='./'>Get Shopping List</a>
				</Button>
			</div>
		
		</Stack>
	</div>
    
  );
});

export default Tasklist;