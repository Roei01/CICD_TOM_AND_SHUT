import { expect } from "chai";
import mysql from "mysql2/promise";

const config = {
    host: "localhost",
    user: "root",
    password: "Razliani1@",
    database: "restaurant"
};

describe("Stam test suit", () => {
    let connection;

    before(async () => {
        connection = await mysql.createConnection(config);
    });

    after(async () => {
        if (connection) {
            await connection.end();
        }
    });

    describe("test Array get sorted", () => {
        it("should return sorted array", () => {
            const names = ['adiel', 'yosi', 'ron']
            expect(names.sort()).to.be.eql(['adiel', 'ron', 'yosi'])
        });
    });

    describe("test add user to database", () => {
        it("should add a user to the database", async () => {
            const [result] = await connection.execute(
                "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
                ["Test User", "test@example.com", "1234567890"]
            );
            expect(result.affectedRows).to.equal(1);
        });
    });

    describe("test add reservation to database", () => {
        it("should add a reservation to the database", async () => {
            const [result] = await connection.execute(
                "INSERT INTO reservations (user_id, guests, date, time) VALUES (?, ?, ?, ?)",
                [1, 2, "2024-07-01", "18:30:00"]
            );
            expect(result.affectedRows).to.equal(1);
        });
    });
});
