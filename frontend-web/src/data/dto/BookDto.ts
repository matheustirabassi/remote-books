export class BookDto {
  id?: number
  title: string
  sinopse?: string
  imageLink: string
  releaseDate: Date
  authorId: number
  categoryId?: number
  collectionId?: number
  authorName?: string

  constructor(
    title: string,
    imageLink: string,
    releaseDate: Date,
    authorId: number,
    categoryId?: number,
    collectionId?: number,
    sinopse?: string,
    id?: number,
    authorName?: string
  ) {
    this.id = id
    this.title = title
    this.sinopse = sinopse
    this.imageLink = imageLink
    this.releaseDate = releaseDate
    this.authorId = authorId
    this.categoryId = categoryId
    this.collectionId = collectionId
    this.authorName = authorName
  }
}
