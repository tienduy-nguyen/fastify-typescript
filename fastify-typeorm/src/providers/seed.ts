import { User } from 'src/modules/user/user.model';
import { container } from 'tsyringe';
import { Connection } from 'typeorm';
import { DbService } from './db.service';
import bcrypt from 'bcrypt';
import { LoggerService } from './logger.service';

let connection: Connection;
const logger = container.resolve(LoggerService);
async function main() {
  const dbService = container.resolve(DbService);
  connection = await dbService.initDB();

  // await connection.createQueryBuilder().delete().from(User).execute();
  await connection.query(`delete from users`);
  const user = User.create({
    firstName: '1',
    lastName: 'user',
    username: 'user1',
    email: 'user1@yopmail.com',
    password: bcrypt.hashSync('1234567', 12),
  });
  await User.save(user);
  logger.info('user1 created!');
}

main()
  .catch((err) => {
    logger.error(err.message);
  })
  .finally(async () => await connection.close());
