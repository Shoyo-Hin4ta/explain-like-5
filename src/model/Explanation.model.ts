import mongoose, {Schema, Document} from "mongoose";

export interface IExplanation extends Document {
    topic: string;
    explanation: string;
    submitterName: string;
    createdAt: Date;
}


const ExplanationSchema: Schema<IExplanation> = new Schema({
    topic: {
        type: String,
        required: true,
        trim: true
      },
      explanation: {
        type: String,
        required: true
      },
      submitterName: {
        type: String,
        required: [true, "Submitter Name is required"],
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});


const ExplanationModel = mongoose.models.Explanation || mongoose.model<IExplanation>('Explanation', ExplanationSchema);

export default ExplanationModel;
