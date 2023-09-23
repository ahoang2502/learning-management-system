const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
	try {
		await database.category.createMany({
			data: [
				{
					name: "Computer Science",
				},
				{
					name: "Data Science",
				},
				{
					name: "Web Developer",
				},
				{
					name: "Machine Learning",
				},
				{
					name: "Mobile Developer",
				},
				{
					name: "DevOps",
				},
			],
		});

        console.log('Success')
	} catch (error) {
		console.log("Error seeding the category database", error);
	} finally {
		await database.$disconnect();
	}
}

main()