import HomeView from "presentation/view/Home/HomeView"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const ROUTES = {
	HOME: "/",
}

const HomeRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomeView />} />
			</Routes>
		</BrowserRouter>
	)
}

export default HomeRoutes