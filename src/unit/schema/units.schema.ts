import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class Unit {
    @Prop({ required: true })
    temperature: string;

    @Prop({ required: true })
    pressure: string;

    @Prop({ required: false })
    density: string

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

}

export const UnitSchema = SchemaFactory.createForClass(Unit);

