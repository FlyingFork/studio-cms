import { PgBoss } from "pg-boss";

async function start() {
  const boss = new PgBoss(process.env.DATABASE_URL!);
  await boss.start();

  await boss.work("process-upload", async (job) => {
    console.log(`Received new job[0] #${job[0].id}`);
  });

  console.log("worker listening");
}

start();
