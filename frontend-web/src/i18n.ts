import i18n from "i18next"
import { initReactI18next } from "react-i18next"

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  pt: {
    translation: {
      "REGISTER": "Cadastrar",
      "BOOK": "Livro",
      "AUTHOR": "Autor",
      "COLLECTION": "Coleção",
      "CATEGORY": "Categoria",
      "NAME": "Nome",
      "CATEGORY_NAME_DESCRIPTION": "O nome da categoria",
      "SAVE": "Salvar",
      "INVALID_FIELD": "Campo inválido",
      "CATEGORY_SAVED": "Categoria salva!",
      "CATEGORY_NAME_ALREADY_EXISTS": "O nome da categoria já existe."
    }
  },
  en: {
    translation: {
      "REGISTER": "Register",
      "BOOK": "Book",
      "AUTHOR": "Author",
      "COLLECTION": "Collection",
      "CATEGORY": "Category",
      "NAME": "Name",
      "CATEGORY_NAME_DESCRIPTION": "The category name",
      "SAVE": "Save",
      "INVALID_FIELD": "Invalid field",
      "CATEGORY_SAVED": "Categoria saved!",
      "CATEGORY_NAME_ALREADY_EXISTS": "The category name already exists."
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "pt", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

  export default i18n