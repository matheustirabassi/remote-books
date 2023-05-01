export class BookDto {
  title: string
  sinopse?: string
  imageLink: string
  releaseDate: Date
  authorId: number
  categoryId: number
  collectionId: number

  constructor(
    title: string,
    imageLink: string,
    releaseDate: Date,
    authorId: number,
    categoryId: number,
    collectionId: number,
    sinopse?: string
  ) {
    this.title = title
    this.sinopse = sinopse
    this.imageLink = imageLink
    this.releaseDate = releaseDate
    this.authorId = authorId
    this.categoryId = categoryId
    this.collectionId = collectionId
  }
}
