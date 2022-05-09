import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { ConfigModule } from '@nestjs/config';
import { ActorModel } from './actor.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  providers: [ActorService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ActorModel,
        schemaOptions: {
          collection: 'Actor'
        }
      }
    ]),
    ConfigModule,
  ],
  controllers: [ActorController]
})
export class ActorModule {}
