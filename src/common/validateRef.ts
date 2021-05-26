import { Injectable } from "@nestjs/common"
import { InjectConnection } from "@nestjs/mongoose"
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"
import { Connection, Model, Mongoose } from "mongoose"

@ValidatorConstraint({ name: "validateRef", async: true })
@Injectable()
export class ValidateRef implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    if (!validationArguments) return false
    if (validationArguments.constraints.length == 0) return false
    const model: Model<Document> = this.connection.models[validationArguments.constraints[0]]
    const doc = await model.findById(value)
    if (!doc) {
      validationArguments.constraints.push(value)
      return false
    }
    return true
  }
  defaultMessage(args: ValidationArguments) {
    const msg = `Invalid ${args.constraints[0]} id: ${args.constraints[1]}`
    while (args.constraints.length > 1) args.constraints.pop()
    return msg
  }
}
