const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();
async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" },
      ],
    });
    console.log("successfully seeded database category");
  } catch (error) {
    console.log("Error in the seeding database category: ", error);
  } finally {
    database.$disconnect();
  }
}

main();
