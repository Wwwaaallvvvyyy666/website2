import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "ID tidak diberikan" });

    const dbPath = path.join(process.cwd(), "db.json");
    if (!fs.existsSync(dbPath)) return res.status(404).json({ error: "Paste tidak ditemukan" });

    const db = JSON.parse(fs.readFileSync(dbPath));
    const paste = db[id];
    if (!paste) return res.status(404).json({ error: "Paste tidak ditemukan" });

    res.status(200).json({ content: paste.content });
}

