import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import ShoppingList from "./components/ShoppingList";
import Tasklist from "./components/tasklist";
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './redux/user.tsx'
import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux';

/**
 * Store
 */
const store = configureStore({
	reducer:{
		user: userSlice
	}
});

export type IRootState = ReturnType<typeof store.getState>

/**
 * Routes
 */
export interface Props {
	className?: string;
	childElement?: ReactElement;
}

const PrivateRoute: FC<Props> = 
({childElement}: Props) => {
	//TODO:
	//const isloggedInKey:string = useSelector((state:IRootState) => state.user.isLoggedInKey);
	//const isloggedIn = localStorage.getItem(isloggedInKey) === "true";
	const isloggedIn = true;
	return isloggedIn
    ? (<>{childElement}</>)
    : (<Navigate replace={false} to={'/officer'}/>)
}

const App = () => {
  return (
	<React.StrictMode>
		<Provider store={store}>
			<Router>
			<Routes>
				<Route path="/" element={<ShoppingList />} />
				<Route
				path="/store"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={false}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer"
				element={
					<Navbar
					title="Login"
					needbuttons={false}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer/mainmenu"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer/itemdetail/:id"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer/reimburse"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer/inventory"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer/shoppinglist"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer/additem"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route
				path="/officer/transaction"
				element={
					<Navbar
					title="Login"
					needbuttons={true}
					isofficerpage={true}
					needtitle={true}
					/>
				}
				/>
				<Route path="/officer/tasklist" element={<PrivateRoute childElement={<Tasklist/>}/>}
				/>
			</Routes>
			</Router>
		</Provider>
	</React.StrictMode>
  );
};

export default App;
