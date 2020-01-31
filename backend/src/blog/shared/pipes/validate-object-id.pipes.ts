import * as mongoose from 'mongoose';
import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    console.log({
      value
    })
    const isValid = mongoose.Types.ObjectId.isValid(value);

    if(!isValid) {
      throw new BadRequestException('Invalid Post Id!');
    }

    return value;
  }
}