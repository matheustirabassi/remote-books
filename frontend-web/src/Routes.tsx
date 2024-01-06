import DI from "di/ioc"
import FormBookView from "presentation/view/Book/Form/FormBookView"
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

  BOOK: "/book"
}

/** As rotas para o sistema */
const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route index element={<HomeView viewModel={DI.resolve("HomeViewModel")} />} />
        <Route path=":id" element={<HomeView viewModel={DI.resolve("HomeViewModel")} />} />
        <Route path={ROUTES.REGISTER} element={<RegisterView />} />
        <Route path={ROUTES.BOOK} >
          <Route path=":id" element={<FormBookView viewModel={DI.resolve("FormBookViewModel")} />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  )
}

export default Routes
