import { ReactNode } from 'react';

import Fields from '../components/Fields';
import SingleField from '../components/SingleField';

import { isString, isNumber, isObject } from '../utils/isType';

import { FieldValue, FieldArray, FieldObject } from '../types';

// Render json properties VALUES
/**
 * @param JsonPropertyValue: FieldValue
 * @returns ReactNode
 */
const renderFieldValue = (fieldValue: FieldValue): ReactNode => {
   const shortenString = (string: string, maxLength = 200): string => {
      if (string.length > maxLength)
         string = string.substring(0, maxLength) + '...';
      return string;
   };

   if (Array.isArray(fieldValue))
      if (fieldValue.every((item) => isNumber(item) || isString(item)))
         return (
            <ul>
               {fieldValue.map((item, key) => (
                  <li key={key}>
                     <span className="value">{item as string}</span>
                     <br />
                  </li>
               ))}
            </ul>
         );
      else
         return fieldValue.map((item, key) => (
            <ul key={key}>{SingleField(item)}</ul>
         ));
   else if (fieldValue && isObject(fieldValue))
      return <ul>{Fields(fieldValue as FieldArray | FieldObject)}</ul>;
   else
      return (
         <span className="value">
            {fieldValue === null || fieldValue === undefined
               ? 'null'
               : shortenString(String(fieldValue))}
         </span>
      );
};

export default renderFieldValue;
