import { IExercise } from "../interfaces/workout/IExercise";
import * as mongoose from 'mongoose';

const options = { timestamps: { createdAt: 'created_at' ,updatedAt: 'updated_at'} }

const Exercise: mongoose.Schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    muscle_groups: {
        type: String,
    },
    media: {
        type: String,

    },
},options);

export default mongoose.model<IExercise & mongoose.Document>('Exercise', Exercise);