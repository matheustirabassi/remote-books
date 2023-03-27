import { ErrorFieldMessage } from "./ErrorFieldMessage"
import { StandardError } from "./StandardError"

export class ValidationStandardError extends StandardError {
  errors: ErrorFieldMessage[]

  constructor(statusCode: number, message: string, timestamp: number, errors: ErrorFieldMessage[]) {
    super(statusCode, message, timestamp)
    this.errors = errors
  }
}
