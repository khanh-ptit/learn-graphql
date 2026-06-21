import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbconfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbconfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ...configService.get('dbconfig.dev'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
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
