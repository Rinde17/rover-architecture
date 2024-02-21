import { defineConfig } from "vite";

export default defineConfig({
    serveur: {
        proxy: {
            host: "http://localhost:3000",
            // Proxy des websockets ou socket.io
            "/sock": {
                changeOrigin: true,
                target: "http://localhost:3000",
                ws: true,
            },
        },
    },
});
