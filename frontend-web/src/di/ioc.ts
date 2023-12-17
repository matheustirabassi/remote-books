import { asFunction, asValue, createContainer } from "awilix"
import { AuthorApi } from "data/api/AuthorApi"
import { BookApi } from "data/api/BookApi"
import { CategoryApi } from "data/api/CategoryApi"
import { CollectionApi } from "data/api/CollectionApi"
import BaseApi from "data/api/config/AxiosConfig"
import HomeViewModel from "presentation/view/Home/HomeViewModel"
import AuthorViewModel from "presentation/view/Register/Author/AuthorViewModel"
import BookViewModel from "presentation/view/Register/Book/BookViewModel"
import CategoryViewModel from "presentation/view/Register/Category/CategoryViewModel"
import CollectionViewModel from "presentation/view/Register/Collection/CollectionViewModel"

const container = createContainer()

container.register({
  HomeViewModel: asFunction(HomeViewModel),
  BookViewModel: asFunction(BookViewModel),
  CategoryViewModel: asFunction(CategoryViewModel),
  AuthorViewModel: asFunction(AuthorViewModel),
  CollectionViewModel: asFunction(CollectionViewModel),

  BaseApi: asValue(BaseApi),
  BookApi: asFunction(BookApi),
  CategoryApi: asFunction(CategoryApi),
  AuthorApi: asFunction(AuthorApi),
  CollectionApi: asFunction(CollectionApi),
})

export default container
