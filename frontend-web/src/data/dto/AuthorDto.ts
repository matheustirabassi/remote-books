export class AuthorDto {
  name: string
  dateOfBirth: Date

  constructor(name: string, dateOfBirth: Date){
      this.name = name
      this.dateOfBirth = dateOfBirth
  }
}