// region isEmpty tests

import { State } from "enums/ViewStateEnum"
import { ViewState } from "data/types/ViewState"

let viewState: ViewState

beforeEach(() => {
  viewState = new ViewState()
})

// region ViewState tests
test("Dado que o estado da tela foi inicializado, é um estado de carregamento", () => {
  expect(viewState.getState()).toEqual(State.LoadingState)
})

// endregion

// region setViewState tests

test("Dado que o estado da tela mudou para carregando, muda o estado", () => {
  viewState.setViewState(State.LoadingState)

  expect(viewState.getState()).toEqual(State.LoadingState)
})

test("Dado que o estado da tela mudou para conteúdo, muda o estado", () => {
  viewState.setViewState(State.ContentState)

  expect(viewState.getState()).toEqual(State.ContentState)
})

test("Dado que o estado da tela mudou para vazio, muda o estado", () => {
  viewState.setViewState(State.EmptyState)

  expect(viewState.getState()).toEqual(State.EmptyState)
})

test("Dado que o estado da tela mudou para erro, muda o estado", () => {
  viewState.setViewState(State.ErrorState)

  expect(viewState.getState()).toEqual(State.ErrorState)
})

// endregion

export {}
