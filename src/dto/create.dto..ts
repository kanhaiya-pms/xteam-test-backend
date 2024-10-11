import { ApiProperty } from "@nestjs/swagger";
import { ERole } from "src/user.schema";

export class CreateDto {
    @ApiProperty({type: String, required: true})
    email: string

    @ApiProperty({type: String, required: true})
    password: string
}