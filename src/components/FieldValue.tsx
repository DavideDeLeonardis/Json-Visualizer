//Libraries
import { ReactNode } from 'react';

// Components
import Fields from '../components/Fields';
import SingleField from '../components/SingleField';

// Utils
import { isString, isNumber, isObject } from '../utils/isType';
import shortenString from '../utils/shortenString';

// Types
import { FieldValue, FieldArray, FieldObject } from '../types';

// Render json properties VALUES
/**
 * @param JsonPropertyValue: FieldValue
 * @returns ReactNode
 */
const renderFieldValue = (fieldValue: FieldValue): ReactNode => {
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
