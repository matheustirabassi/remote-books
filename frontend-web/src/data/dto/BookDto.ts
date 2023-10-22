export class BookDto {
  id?: number
  title: string
  sinopse?: string
  accessLink: string
  imageLink: string
  releaseDate: Date
  authorId: number
  categoryId?: number
  collectionId?: number
  authorName?: string

  constructor(
    title: string,
    imageLink: string,
    accessLink: string,
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
    this.accessLink = accessLink
    this.imageLink = imageLink
    this.releaseDate = releaseDate
    this.authorId = authorId
    this.categoryId = categoryId
    this.collectionId = collectionId
    this.authorName = authorName
  }
}
