import { State } from "../../enums/ViewStateEnum"

/**
 * Classe que lida com estados da tela.
 */
export class ViewState {
  private state: State = State.LoadingState

  private VIEW_VISIBLE = ""

  private VIEW_INVISIBLE = "none"

  getState() {
    return this.state
  }

  /**
   * Muda o estado da tela.
   * 
   * @param newState O novo estado da tela
   */
  setViewState(newState: State) {
    this.state = newState

    const contentView: HTMLElement | null = document.getElementById("contentView")
    const loadingView: HTMLElement | null = document.getElementById("loadingView")
    const errorView: HTMLElement | null = document.getElementById("errorView")
    const emptyView: HTMLElement | null = document.getElementById("emptyView")

    this.setViewDisplay(contentView, State.ContentState)
    this.setViewDisplay(loadingView, State.LoadingState)
    this.setViewDisplay(errorView, State.ErrorState)
    this.setViewDisplay(emptyView, State.EmptyState)
  }

  private setViewDisplay(view: HTMLElement | null, state: State) {
    if (view === null) {
      return
    }

    view.style.display =
      this.state === state ? this.VIEW_VISIBLE : this.VIEW_INVISIBLE
  }
}
