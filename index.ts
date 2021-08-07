import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // We create a new user
  const newUser = await prisma.user.create({
    data: {
      email: "hello@herewecode.io",
      username: "gaelgthomas", // <- it's also my Twitter username 😄
    },
  });

  console.log("New User:");
  console.log(newUser);

  // We create a new tweet and we link it to our new user
  const firstTweet = await prisma.tweet.create({
    data: {
      text: "Hello world!",
      userId: newUser.id,
    },
  });

  console.log("First tweet:");
  console.log(firstTweet);

  // We fetch the new user again (by its unique email address)
  // and we ask to fetch its tweets at the same time
  const newUserWithTweets = await prisma.user.findUnique({
    where: {
      email: "hello@herewecode.io",
    },
    include: { tweets: true },
  });

  console.log("User object with Tweets:");
  console.dir(newUserWithTweets);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
