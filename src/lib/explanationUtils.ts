import { ApiResponse } from "@/types/ApiResponse";
import { IExplanation } from "@/model/Explanation.model";

const BASE_URL = process.env.BASE_URL || '';

export async function getExplanations(): Promise<ApiResponse<IExplanation[]>> {
    const res = await fetch(`${BASE_URL}/api/get-explanations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    });
    if (!res.ok) {
        throw new Error('Failed to fetch explanations');
    }
    return res.json();
}