import { generateExplanation } from "@/helpers/claudeApi";
import dbConnect from "@/lib/dbConnect";
import ExplanationModel, { IExplanation } from "@/model/Explanation.model";
import { userInputValidation } from "@/schema/inputSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UserInputSchema = z.object({
    input: userInputValidation
});

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<IExplanation>>> {
    await dbConnect();

    try {
        const body = await request.json();
        const result = UserInputSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: 'Invalid input',
                error: {
                    code: 'VALIDATION_ERROR',
                    details: result.error.errors.map(e => e.message).join(', ')
                }
            }, { status: 400 });
        }

        const validatedData = result.data.input;
        const explanation = await generateExplanation(validatedData.topic);

        // console.log(explanation);

        const newExplanation = new ExplanationModel({
            ...validatedData,
            explanation,
        });

        const savedExplanation = await newExplanation.save();

        return NextResponse.json({
            success: true,
            message: 'Explanation created successfully',
            data: savedExplanation,
        }, { status: 201 });

    } catch (error) {
        console.error('Error in explanations API:', error);
    
        if (error instanceof Error && error.message.includes('Failed to generate explanation')) {
            return NextResponse.json({
                success: false,
                message: 'Failed to generate explanation',
                error: {
                    code: 'AI_GENERATION_FAILED',
                    details: error.message,
                },
            }, { status: 500 });
        }
    
        return NextResponse.json({
            success: false,
            message: 'Failed to create explanation',
            error: {
                code: 'CREATION_FAILED',
                details: error instanceof Error ? error.message : 'Unknown error occurred',
            },
        }, { status: 500 });
    }
}