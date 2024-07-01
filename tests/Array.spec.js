import { expect } from "chai";
import mysql from "mysql2/promise";
import { dbConfig } from "./config.js";
import updateReservation from "./updateReservation.js"; // לוודא שהנתיב נכון

describe("Stam test suit", () => {
    let connection;

    before(async () => {
        connection = await mysql.createConnection(dbConfig);
    });

    after(async () => {
        await connection.end();
    });

    // בדיקות קיימות...

    describe("test update reservation", () => {
        it("should update a reservation in the database", async () => {
            const [reservations] = await connection.execute("SELECT id FROM reservations LIMIT 1");
            const reservationId = reservations[0].id;

            const result = await updateReservation(reservationId, "2024-01-02", "20:00:00", 3);
            expect(result).to.be.true;
        });
    });
});
