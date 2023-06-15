export class AuthorDto {
  id?: number = undefined
  name: string
  dateOfBirth?: Date

  constructor(name: string, dateOfBirth?: Date, id?: number){
      this.id = id
      this.name = name
      this.dateOfBirth = dateOfBirth
  }
}