export const API_URL = "https://aulaasync-api.onrender.com/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function authFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = await AsyncStorage.getItem("token");

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
}