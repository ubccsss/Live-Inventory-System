import { createSlice } from "@reduxjs/toolkit"

export type UserType = {
	user: string | null,
	isLoggedIn: boolean;
	isLoggedInKey: string;
}

const initialState : UserType = {
	user: localStorage.getItem('user'),
	//TODO: isLoggedIn: 'user' in localStorage,
	isLoggedIn: true,
	isLoggedInKey: "isLoggedIn"
}


const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsLoggedInTrue (state, action)  {
			action.payload;
			state.isLoggedIn = true;
			//TODO: localStorage.setItem("user.isLoggedIn", 'true');
		},
		
		setIsLoggedInFalse (state, action)  {
			action.payload;
			state.isLoggedIn = false;
			//TODO: localStorage.setItem("user.isLoggedIn", 'false');
		}
	}
});

export const {setIsLoggedInTrue, setIsLoggedInFalse} = userSlice.actions;

export default userSlice.reducer;

