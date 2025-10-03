import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ViewPage() {
    const router = useRouter();
    const { id } = router.query;
    const [content, setContent] = useState("Memuat...");

    useEffect(() => {
        if (!id) return;
        fetch(`/api/get?id=${id}`)
            .then(r => r.json())
            .then(d => {
                if (d.content) setContent(d.content);
                else setContent("Paste tidak ditemukan!");
            });
    }, [id]);

    return (
        <div style={{ padding: "2rem", background: "#111", color: "#eee", fontFamily: "Arial" }}>
            <h1>Walvy Paste Viewer</h1>
            <pre style={{ background: "#222", padding: "1rem" }}>{content}</pre>
        </div>
    );
}
