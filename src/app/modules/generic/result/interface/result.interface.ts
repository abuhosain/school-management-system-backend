import { Types } from 'mongoose';

// Enum for grade values
export enum GradeEnum {
  A_PLUS = 'A+',
  A = 'A',
  A_MINUS = 'A-',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
}

export interface IResult {
  student: Types.ObjectId;
  organization: Types.ObjectId;

  exam_name: string;
  year: number;
  class: number;
  session: number;
  group?: string;
  
  results: {
    subject: string;
    marks: number;
    grade: GradeEnum;
    gpa: number;
  }[];

  total_marks: number;
  gpa: number;
  grade: GradeEnum;
  is_passed: boolean;
}
