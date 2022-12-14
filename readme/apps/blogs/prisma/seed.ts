import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fillDb() {
    await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            originPostId: 1,
            userId: '42',
            originUserId: '42',
            postCreationDate: new Date(),
            originPostCreationDate: new Date(),
            postType: 'text',
            postState: 'published',
            isRepost: false,
            likeCount: 0,
            likeUsers: [] as string[],
            name: 'I2C-адрес устройства и как его узнать.',
            videoLink: '',
            announceText: 'Для подключения различных модулей к Arduino, например, датчиков, дисплеев и АЦП удобно пользоваться шиной I2C (Inter-Integrated Circuit).',
            text: 'Каждое подключенное устройство имеет свой адрес, к одной шине может быть подключено до 119 устройств (всего адресов 127, 8 из них –зарезервированные служебные). Самая распространённая проблема при использовании I2C – незнание адреса подключаемого устройства (хотя обычно производитель указывает их). Особенно это заметно при использовании дешёвых китайских устройств разных производителей, например, символьного LCD дисплея с I2C адаптером (их адреса обычно 0x27 или 0x3F). Для того, чтобы проверить наличие подключенных к Arduino I2C-устройств, нужно просто просканировать каждый доступный адрес с 8 до 127. Успешно прошедшая отправка данных – верный признак наличия ведомого устройства на шине.',
            author: 'Анна Сыроежкина',
            photo: '',
            link: '',
            tags: ['микроконтроллеры', 'i2c', 'arduino'],
            comments: {
              create: [
                {
                  text: 'Супер! Лучше, даже я не написал бы!',
                  userId: '3423',
                  date: new Date(),
                },
                {
                  text: 'Большое спасибо. Теперь ясно, что я делал не так...',
                  userId: '5678',
                  date: new Date(),
                }
              ]
            }
        }
    })

    await prisma.post.upsert({
      where: { id: 2 },
      update: {},
      create: {
          originPostId: 2,
          userId: '33',
          originUserId: '33',
          postCreationDate: new Date(),
          originPostCreationDate: new Date(),
          postType: 'video',
          postState: 'published',
          isRepost: false,
          likeCount: 0,
          likeUsers: [] as string[],
          name: 'ЧТО уничтожает ВСЕ цивилизации в космосе?',
          videoLink: 'https://www.youtube.com/watch?v=tvzfEA75CRQ',
          announceText: '',
          text: '',
          author: '',
          photo: '',
          link: '',
          tags: ['космос', 'философия'],
          comments: {
            create: [
              {
                text: 'Потрясающе!!! Очень интересные темы поднимаете. Спасибо! ',
                userId: '8999',
                date: new Date(),
              },
            ]
          }
      }
  })
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
