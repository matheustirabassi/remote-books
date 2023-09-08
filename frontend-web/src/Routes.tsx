import HomeView from "presentation/view/Home/HomeView"
import RegisterView from "presentation/view/Register/RegisterView"
import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom"

/**
 * As rotas do sistema
 */
export const ROUTES = {
  /**
   * Rota para tela principal
   */
  HOME: "/",

  /** Rota pra tela de cadastro*/
  REGISTER: "/register",
}

/** As rotas para o sistema */
const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route index element={<HomeView />} />
        <Route path={ROUTES.REGISTER} element={<RegisterView />} />
      </ReactRoutes>
    </BrowserRouter>
  )
}

export default Routes
