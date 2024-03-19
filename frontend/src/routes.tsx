import React from "react";
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import Tasklist from "./components/tasklist";
export interface Props {
	children?: React.ComponentType<unknown>;
}

const TheRoutes = (parameters: Props) =>(
	<BrowserRouter {...parameters}>
		<Routes>
			<Route path="/tasklist" Component={Tasklist} element={<Navigate to="/tasklist"/>}>
			</Route>
		</Routes>
	</BrowserRouter>
);

export default TheRoutes;