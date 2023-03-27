export class ErrorFieldMessage {
  fieldName: string
  message: string

  constructor(fieldName: string, message: string){
      this.fieldName = fieldName      
      this.message = message
  }
}