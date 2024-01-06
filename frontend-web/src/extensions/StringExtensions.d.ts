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

    limitChars: (maxLength: number) => string

    isImageLink: () => boolean

    isLink:() => boolean
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

// eslint-disable-next-line no-extend-native
String.prototype.limitChars = function (this: string, maxLength: number): boolean {
  if (this === undefined) {
    return ""
  }

  if (this.length <= maxLength) {
    return this
  }

  return this.substring(0, maxLength).concat("...")
}

// eslint-disable-next-line no-extend-native
String.prototype.isImageLink = function (this: string): boolean {
  return this.match(RegexConstants.IMAGE_LINK_REGEX) !== null
}

// eslint-disable-next-line no-extend-native
String.prototype.isLink = function (this: string): boolean {
  return this.match(RegexConstants.LINK_REGEX) !== null
}
