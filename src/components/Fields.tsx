//Libraries
import { ReactNode } from 'react';

// Components
import FieldValue from './FieldValue';

// Utils
import { isObject } from '../utils/isType';

// Types
import { FieldArray, FieldObject } from '../types';

// Render all json entries
/**
 * @param JsonEntries: FieldArray | FieldObject
 * @returns ReactNode
 */
const Fields = (field: FieldArray | FieldObject): ReactNode => {
   return Object.entries(field).map(([fieldName, fieldValue], key) => (
      <li key={key}>
         <span className="key">{fieldName}</span>:
         <span className="type">
            {fieldValue === null || undefined
               ? 'null'
               : Array.isArray(fieldValue)
               ? '[ ]'
               : isObject(fieldValue)
               ? '{ }'
               : typeof fieldValue}
         </span>
         {' --> '}
         {(fieldValue !== null || undefined) &&
         (Array.isArray(fieldValue) || isObject(fieldValue)) ? (
            <details className="value">
               <summary></summary>
               {FieldValue(fieldValue)}
            </details>
         ) : (
            FieldValue(fieldValue)
         )}
      </li>
   ));
};

export default Fields;
