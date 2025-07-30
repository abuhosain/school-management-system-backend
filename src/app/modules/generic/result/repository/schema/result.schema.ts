import { Schema, model, Types } from 'mongoose';
import { IResult } from '../../interface/result.interface';

export enum GradeEnum {
  A_PLUS = 'A+',
  A = 'A',
  A_MINUS = 'A-',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
}

const resultSchema = new Schema<IResult>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    exam_name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    class: {
      type: Number,
      required: true,
    },
    session: {
      type: Number,
      required: true,
    },
    group: {
      type: String,
    },
    results: [
      {
        subject: { type: String, required: true },
        marks: { type: Number, required: true },
        grade: {
          type: String,
          enum: Object.values(GradeEnum),
          required: true,
        },
        gpa: { type: Number, required: true },
      },
    ],
    total_marks: {
      type: Number,
      required: true,
    },
    gpa: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      enum: Object.values(GradeEnum),
      required: true,
    },
    is_passed: {
      type: Boolean,
      required: true,
      default : true
    },
  },
  {
    timestamps: true,
  },
);

export const Result = model<IResult>('Result', resultSchema);
