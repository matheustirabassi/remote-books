
import { RegexConstants } from "enums/Constants"

declare global {
  interface String {
    /**
     * Verifica se o texto é vazio.
     *
     * @returns `true` caso texto é vazio, `false` caso contrário.
     */
    isEmpty: () => boolean

    /**
     * Verifica se o texto é um
     *
     * @returns `true` caso seja um nome, `false` caso contrário.
     */
    isName: () => boolean
  }
}

// eslint-disable-next-line no-extend-native
String.prototype.isEmpty = function (this: string | undefined | null): boolean {
  return this === undefined || this === null || this === "" || this.trim().length < 1
}

// eslint-disable-next-line no-extend-native
String.prototype.isName = function (this: string): boolean {
  return this.match(RegexConstants.NAME_REGEX) !== null
}
