import api from "@/api/axios";

export const searchQuery = async (query) => {
    try {
        const res = await api.get("/search",
            {
                params: { q: query }
            });
        return res.data;
    } catch (err) {
        throw err.message
    }
}
