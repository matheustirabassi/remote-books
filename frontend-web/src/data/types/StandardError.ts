export class StandardError {
  statusCode: number
  message: string
  timestamp: number

  constructor(statusCode: number, message: string, timestamp: number){
      this.statusCode = statusCode
      this.message = message
      this.timestamp = timestamp
  }
}