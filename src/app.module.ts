import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbconfig from './config/db.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './components/user/user.module';
import { DatabaseModule } from './database/database.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbconfig],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loaderOptions: {
        path: join(__dirname, 'i18n/'),
        watch: true, // Watch for changes in translation files
      },
      resolvers: [AcceptLanguageResolver],
      logging: false,
    }),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // code first approach
      playground: false, // tắt giao diện graphql playground
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // Bật Apollo Sandbox
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    this.logger.log(`---------- DATABASE CONFIG ----------`);
    this.logger.log(`HOST: ${this.configService.get('POSTGRES_HOST')}`);
    this.logger.log(`PORT: ${this.configService.get('POSTGRES_PORT')}`);
    this.logger.log(`USER: ${this.configService.get('POSTGRES_USER')}`);
    // Đã xóa PASS đi để test phần code bị gạch bỏ (xóa)
    this.logger.log(`DB: ${this.configService.get('POSTGRES_DB')}`);
    this.logger.log(`-------------------------------------`);

    if (this.dataSource.isInitialized) {
      this.logger.log('✅ Database connected successfully!');
    } else {
      this.logger.error('❌ Failed to connect to database.');
    }
  }
}
