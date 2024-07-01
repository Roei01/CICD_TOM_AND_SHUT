import { expect } from "chai";
import mysql from "mysql2/promise";
import { dbConfig } from "./config.js"; // לוודא שהנתיב נכון

describe("Stam test suit", () => {
    let connection;

    before(async () => {
        connection = await mysql.createConnection(dbConfig);
    });

    after(async () => {
        await connection.end();
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
            const [users] = await connection.execute("SELECT id FROM users WHERE email = ?", ["test@example.com"]);
            const userId = users[0].id;

            const [result] = await connection.execute(
                "INSERT INTO reservations (user_id, guests, date, time) VALUES (?, ?, ?, ?)",
                [userId, 2, "2024-01-01", "19:00:00"]
            );
            expect(result.affectedRows).to.equal(1);
        });
    });
});
