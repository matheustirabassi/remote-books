import { States } from "../../enums/ViewStateEnum"

/**
 * Classe que lida com estados da tela.
 */
export class ViewState {
  private state: States = States.ContentState

  private VIEW_VISIBLE = ""

  private VIEW_INVISIBLE = "none"

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

    this.setViewDisplay(contentView, States.ContentState)
    this.setViewDisplay(loadingView, States.LoadingState)
    this.setViewDisplay(errorView, States.ErrorState)
    this.setViewDisplay(emptyView, States.EmptyState)
  }

  private setViewDisplay(view: HTMLElement | null, state: States) {
    if (view === null) {
      return
    }

    view.style.display =
      this.state === state ? this.VIEW_VISIBLE : this.VIEW_INVISIBLE
  }
}
