import { asFunction, createContainer } from "awilix"
import { BookApiImpl} from "data/api/BookApi"
import HomeViewModelImpl from "presentation/view/Home/HomeViewModel"
import BookViewModelImpl from "presentation/view/Register/Book/BookViewModel"

const container = createContainer()

container.register({
  HomeViewModel: asFunction(HomeViewModelImpl),
  BookViewModel: asFunction(BookViewModelImpl),
  bookApi: asFunction(BookApiImpl)
})

export default container
