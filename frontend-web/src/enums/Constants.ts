/**
 * As constantes do sistema
 */
export const LanguageConstants = {
  REGISTER: "REGISTER",
  BOOK: "BOOK",
  COLLECTION: "COLLECTION",
  AUTHOR: "AUTHOR",
  CATEGORY: "CATEGORY",
  NAME: "NAME",
  CATEGORY_NAME_DESCRIPTION: "CATEGORY_NAME_DESCRIPTION",
  SAVE: "SAVE",
  INVALID_FIELD: "INVALID_FIELD",
  CATEGORY_SAVED: "CATEGORY_SAVED",
  SAVED_CONTENT: "SAVED_CONTENT",
  ERR_NETWORK: "ERR_NETWORK",
  DATE_OF_BIRTH: "DATE_OF_BIRTH",
  TITLE: "TITLE",
  SYNOPSIS: "SYNOPSIS",
  RELEASE_DATE: "RELEASE_DATE",
  LINK: "LINK",
  SELECT: "SELECT",
  ACCESS_LINK: "ACCESS_LINK",
  IMAGE_LINK: "IMAGE_LINK",
  BOOK_ACCESS_LINK_REQUIRED: "BOOK_ACCESS_LINK_REQUIRED",
}

export const RegexConstants = {
  NAME_REGEX: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  IMAGE_LINK_REGEX: /(https?:\/\/.*\.(?:png|jpg))/i,
  LINK_REGEX: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
}
