export class CollectionDto {
  id?: number
  name: string

  constructor(name: string, id?: number){
      this.id = id
      this.name = name
  }
}