import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Content kosong" });

    // Generate ID unik
    const id = uuidv4();

    // Simpan ke file JSON sederhana (untuk versi dev, di prod bisa pakai DB)
    const dbPath = path.join(process.cwd(), "db.json");
    let db = {};
    if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath));

    db[id] = { content, created_at: new Date().toISOString() };
    fs.writeFileSync(dbPath, JSON.stringify(db));

    res.status(200).json({ id, link: `/view?id=${id}` });
}
