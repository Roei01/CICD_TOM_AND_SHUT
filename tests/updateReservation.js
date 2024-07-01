import mysql from "mysql2/promise";
import { dbConfig } from "./config.js";

async function updateReservation(reservationId, newDate, newTime, newGuests) {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
        "UPDATE reservations SET date = ?, time = ?, guests = ? WHERE id = ?",
        [newDate, newTime, newGuests, reservationId]
    );
    await connection.end();
    return result.affectedRows === 1;
}

export default updateReservation;
