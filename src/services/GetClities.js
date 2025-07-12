import api from "@/lib/axios"

export const getCities = async () => {
    const res = await api.get("/user/cities");
    return res.data.cities;
}