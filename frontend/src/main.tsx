import React, { FC, ReactElement } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './redux/user.tsx'
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import Tasklist from "./components/tasklist";
import Logout from "./components/logout_tmp";

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
    : (<Navigate replace={false} to={'/logout'}/>)
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
	<Provider store={store}>
			<App />
			<BrowserRouter>
				<Routes>
					<Route path="/tasklist" element={<PrivateRoute childElement={<Tasklist/>}/>}>
					</Route>
					<Route path="/logout" Component={Logout} element={<Navigate to={'/logout'}/>}>
					</Route>
				</Routes>
			</BrowserRouter>
	</Provider>
   
  </React.StrictMode>,
)
