// Core
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(
    value: any,
    metadata: ArgumentMetadata,
  ) {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      const errorMessage = `Validation failed. "${parsedValue}" is not an integer.`;
      throw new BadRequestException(errorMessage);
    }

    return value;
  }
}
