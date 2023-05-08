//Libraries
import { FC, ChangeEvent, ReactNode, useState } from 'react';

// SCSS
import './assets/scss/index.scss';

type FieldValue = string | number | boolean | FieldArray | FieldObject | null;
type FieldArray = FieldValue[];
interface FieldObject {
   [fieldName: string]: FieldValue | null;
}

// Render all json entries
/**
 * @param JsonEntries: FieldArray | FieldObject
 * @returns ReactNode
 */
const renderFields = (field: FieldArray | FieldObject): ReactNode => {
   return Object.entries(field).map(([fieldName, fieldValue], key) => (
      <li key={key}>
         <strong>{fieldName}</strong>
         {fieldValue === null || undefined
            ? null
            : Array.isArray(fieldValue)
            ? ': []'
            : typeof fieldValue === 'object'
            ? ': {}'
            : `: ${typeof fieldValue}`}
         {' -> '}
         {renderFieldValue(fieldValue)}
      </li>
   ));
};

// Render json properties VALUES
/**
 * @param JsonPropertyValue: FieldValue
 * @returns ReactNode
 */
const renderFieldValue = (fieldValue: FieldValue): ReactNode => {
   // Render if array
   if (Array.isArray(fieldValue))
      if (
         fieldValue.every(
            (item) => typeof item === 'number' || typeof item === 'string'
         )
      )
         return fieldValue.join(', ');
      else
         return fieldValue.map((item, index) => (
            <ul key={index}>{renderSingleField(item)}</ul>
         ));
   // Render if object
   else if (fieldValue && typeof fieldValue === 'object')
      return renderFields(fieldValue);
   // Else
   else
      return (
         <>
            {fieldValue === null || fieldValue === undefined
               ? 'null'
               : String(fieldValue)}
         </>
      );
};

// Render json single fields and nullish values
/**
 * @param JsonProperty: FieldValue
 * @returns ReactNode
 */
const renderSingleField = (field: FieldValue): ReactNode => {
   // Render if array
   if (Array.isArray(field) && field.every((item) => typeof item === 'number'))
      return field.join(', ');
   // Render if object
   else if (field && typeof field === 'object') return renderFields(field);
   // Else
   else return <>{field === null || field === undefined ? 'null' : field}</>;
};

const App: FC = () => {
   const [jsonData, setJsonData] = useState<FieldObject[]>([]);

   // Handler for file input upload
   const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
         try {
            const json = JSON.parse(reader.result as string);

            if (!Array.isArray(json)) setJsonData([json]);
            else setJsonData(json);
         } catch (error) {
            alert('Errore nella lettura del file JSON.');
         }
      };
      reader.readAsText(file);
   };

   return (
      <main>
         <input type="file" accept=".json" onChange={handleFileUpload} />
         <div className="container">
            {jsonData.map((item, key) => (
               <ul key={key}>{renderFields(item)}</ul>
            ))}
         </div>
      </main>
   );
};

export default App;
