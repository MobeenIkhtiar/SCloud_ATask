import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class CreateLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Prop({
    type: 'string',
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Prop({ type: 'string', required: true, trim: true })
  password: string;
}
