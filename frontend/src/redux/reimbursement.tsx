import { createSlice } from "@reduxjs/toolkit"

export type Reimbursement = {
	id: string;
	user_id: number;
	name: string|null;
	saved: boolean;
	uploadedReceipt: boolean;
	displayReceipt: boolean;
	uploadedBankStatement: boolean;
	displayBankStatement: boolean;
}

function genUniqueId(): string {//https://www.newline.co/books/beginners-guide-to-typescript/generating-unique-ids
	const dateStr = Date.now().toString(36); // convert num to base 36 and stringify
	const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point
	return `${dateStr}-${randomStr}`;
}

const initialState : Reimbursement = {
	id: genUniqueId(),
	//TODO: fetch user_id
	user_id: 0,
	name: null,
	saved: false,
	uploadedReceipt: false,
	displayReceipt: true,
	uploadedBankStatement: false,
	displayBankStatement: false,
}

const reimbursementSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		displayReceipt (state, action)  {
			action.payload;
			state.displayBankStatement = false;
			state.displayReceipt = true;
		},
		
		displayBankStatement (state, action)  {
			action.payload;
			state.displayBankStatement = true;
			state.displayReceipt = false;
		},
		
		uploadBankStatement (state, action)  {
			//TODO: save to DB
			action.payload;
			state.uploadedBankStatement = true;
		},
		
		uploadReceipt (state, action)  {
			//TODO: save to DB
			action.payload;
			state.uploadedReceipt = true;
			console.log("uploadReceipt");
		},

		saveReminbursement(state, action) {
			action.payload;
			//TODO: save to DB
			state.saved = true;
		},

		submitReminbursement(state, action) {
			action.payload;
			if(state.name != null && state.uploadedBankStatement && state.uploadedReceipt){
				//TODO: save to DB
			}
		}
	}
});

export const {displayReceipt, displayBankStatement, uploadBankStatement, uploadReceipt, saveReminbursement, submitReminbursement} = reimbursementSlice.actions;

export default reimbursementSlice.reducer;