import { ReactNode } from 'react';

import Fields from '../components/Fields';

import { isNumber, isObject } from '../utils/isType';

import { FieldValue, FieldArray, FieldObject } from '../types';

// Render json single fields and nullish values
/**
 * @param JsonProperty: FieldValue
 * @returns ReactNode
 */
const SingleField = (field: FieldValue): ReactNode => {
   if (Array.isArray(field) && field.every((item) => isNumber(item)))
      return field.join(', ');
   else if (field && isObject(field))
      return Fields(field as FieldArray | FieldObject);
   else return <>{field === null || field === undefined ? 'null' : field}</>;
};

export default SingleField;
