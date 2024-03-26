import { IsEmail, IsNumber, Max, Min } from 'class-validator';
import { Param, ParamType } from '@discord-nestjs/core';
import { Attachment } from 'discord.js';

export class MintSlashDto {
  @Min(1)
  @Max(10000)
  @IsNumber()
  @Param({
    name: 'mint-copies',
    description: 'Number of copies to mint',
    required: true,
    type: ParamType.INTEGER,
  })
  copies: number;

  @IsEmail()
  @Param({
    name: 'email',
    description: 'Email address to send the claimable POAPs to',
    required: true,
  })
  email: string;

  @Param({
    name: 'image',
    description: 'The image to mint',
    required: true,
    type: ParamType.ATTACHMENT,
  })
  image: Attachment;
}
