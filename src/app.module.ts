import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { RouterModule } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

import { CustomerModule } from './api/customer/customer.module';
import { AddressModule } from './api/address/address.module';
import { SpouseModule } from './api/spouse/spouse.module';
import { DependentModule } from './api/dependent/dependent.module';
import { CommentModule } from './api/comment/comment.module';
import { CallLogModule } from './api/call-log/call-log.module';
import { HealthController } from './api/health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.CUSTOMER_DB_URI || 'mongodb://localhost:27017/customers',
      }),
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      formatError: (err) => {
        console.error('GraphQL Error:', err.message);
        return { message: err.message };
      },
    }),
    HttpModule,
    CustomerModule,
    AddressModule,
    SpouseModule,
    DependentModule,
    CommentModule,
    CallLogModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          {
            path: 'customers',
            module: CustomerModule,
          },
          {
            path: 'addresses',
            module: AddressModule,
          },
          {
            path: 'spouses',
            module: SpouseModule,
          },
          {
            path: 'dependents',
            module: DependentModule,
          },
          {
            path: 'comments',
            module: CommentModule,
          },
          {
            path: 'call-log',
            module: CallLogModule,
          },
        ],
      },
    ]),
  ],
  controllers: [HealthController],
})
export class AppModule {}