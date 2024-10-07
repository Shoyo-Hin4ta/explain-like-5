export const dynamic = 'force-dynamic';

import dbConnect from "@/lib/dbConnect";
import ExplanationModel, { IExplanation } from "@/model/Explanation.model";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ApiResponse<IExplanation[]>>> {
    try {
        await dbConnect();
        const explanations = await ExplanationModel.find({});

        return NextResponse.json({
            success: true,
            message: 'Explanations retrieved successfully',
            data: explanations,
        }, { status: 200 });
        
    } catch (error) {
        console.error('Error fetching explanations:', error);
        
        return NextResponse.json({
            success: false,
            message: 'Failed to retrieve explanations',
            error: {
                code: 'FETCH_FAILED',
                details: error instanceof Error ? error.message : 'Unknown error occurred',
            },
        }, { status: 500 });
    }   
}