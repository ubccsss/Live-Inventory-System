import { memo } from 'react';
import type { FC } from 'react';

import resets from '../styles/_resets.module.css';
import { TasklistButton } from './tasklistButton';
import classes from '../styles/Tasklist.module.css';

interface Props {
  className?: string;
}
/* @figmaId 55:4 */
export const Tasklist: FC<Props> = memo(function Screen(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.background}></div>
      <div className={classes.button3}></div>
      <div className={classes.reimbursementRequest}>Reimbursement Request</div>
      <div className={classes.button32}></div>
      <div className={classes.transactionLog}>Transaction History </div>
      <div className={classes.finance}>Finance</div>
      <div className={classes.button33}>
        <TasklistButton className={classes.icon} />
      </div>
      <div className={classes.getShoppingList}>Get Shopping List</div>
      <div className={classes.button34}></div>
      <div className={classes.updateInventory}>View/Update Inventory</div>
      <div className={classes.manageInventory}>Manage Inventory</div>
      <div className={classes.button35}></div>
      <div className={classes.reimbursementRequest2}>Logout</div>
    </div>
  );
});

export default Tasklist;