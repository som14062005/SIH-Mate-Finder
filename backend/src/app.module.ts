import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module'; // Import your chat module

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/teamfind'),
    AuthModule,
    ProfileModule,
    ChatModule, // Add ChatModule here
  ],
})
export class AppModule {}
