import { States } from "./enums/ViewStateEnum"

/**
 * Classe que lida com estados da tela.
 */
export class ViewState {
  private state: States = States.ContentState

  private VIEW_VISIBLE = "visible"

  private VIEW_INVISIBLE = "hidden"

  /** Cria o objeto no estado de conteúdo */
  constructor() {
    this.setViewState(States.ContentState)
  }

  getState() {
    return this.state
  }

  /**
   * Muda o estado da tela.
   * 
   * @param newState O novo estado da tela
   */
  setViewState(newState: States) {
    this.state = newState

    const contentView: HTMLElement | null = document.getElementById("contentView")
    const loadingView: HTMLElement | null = document.getElementById("loadingView")
    const errorView: HTMLElement | null = document.getElementById("errorView")
    const emptyView: HTMLElement | null = document.getElementById("emptyView")

    this.setViewVisibility(contentView, States.ContentState)
    this.setViewVisibility(loadingView, States.LoadingState)
    this.setViewVisibility(errorView, States.ErrorState)
    this.setViewVisibility(emptyView, States.EmptyState)
  }

  private setViewVisibility(view: HTMLElement | null, state: States) {
    if (view === null) {
      return
    }

    view.style.visibility =
      this.state === state ? this.VIEW_VISIBLE : this.VIEW_INVISIBLE
  }
}
