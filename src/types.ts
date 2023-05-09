export type FieldValue =
   | string
   | number
   | boolean
   | FieldArray
   | FieldObject
   | null;

export type FieldArray = FieldValue[];

export interface FieldObject {
   [fieldName: string]: FieldValue | null;
}
