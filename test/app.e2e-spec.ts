import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum'
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async ()=> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true
    }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  });

  afterAll(()=> {
    app.close()
  });

  describe('Auth',()=> {
    describe('Signup', ()=> {
      it('should signup', ()=> {
        const dto:AuthDto = {
          email:'test3@gmail.com',
          password:'123'
        }
        return pactum.spec().post('/auth/signup',)
        .withBody(dto)
        .expectStatus(201)
      })
    })

    
  })


  it.todo('should pass');
});
