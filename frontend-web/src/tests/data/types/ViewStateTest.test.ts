// region isEmpty tests

import { States } from "enums/ViewStateEnum"
import { ViewState } from "data/types/ViewState"

let viewState: ViewState

beforeEach(() => {
  viewState = new ViewState()
})

// region ViewState tests
test("Dado que o estado da tela foi inicializado, é um estado de conteúdo", () => {
  expect(viewState.getState()).toEqual(States.ContentState)
})

// endregion

// region setViewState tests

test("Dado que o estado da tela mudou para carregando, muda o estado", () => {
  viewState.setViewState(States.LoadingState)

  expect(viewState.getState()).toEqual(States.LoadingState)
})

test("Dado que o estado da tela mudou para conteúdo, muda o estado", () => {
  viewState.setViewState(States.LoadingState)

  viewState.setViewState(States.ContentState)
  
  expect(viewState.getState()).toEqual(States.ContentState)
})

test("Dado que o estado da tela mudou para vazio, muda o estado", () => {
  viewState.setViewState(States.EmptyState)

  expect(viewState.getState()).toEqual(States.EmptyState)
})

test("Dado que o estado da tela mudou para erro, muda o estado", () => {
  viewState.setViewState(States.ErrorState)

  expect(viewState.getState()).toEqual(States.ErrorState)
})

// endregion

export {}
