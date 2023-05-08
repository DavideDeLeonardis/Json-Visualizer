import { FC, ChangeEvent, ReactNode, useState } from 'react';
import './assets/scss/index.scss';

type FieldValue = string | number | boolean | FieldArray | FieldObject | null;
type FieldArray = FieldValue[];
interface FieldObject {
   [fieldName: string]: FieldValue | null;
}
const displayFields = (field: FieldArray | FieldObject): ReactNode => {
   return Object.entries(field).map(([fieldName, fieldValue], key) => (
      <li key={key}>
         <strong>{fieldName}</strong>: {typeof fieldValue} {'->'}{' '}
         {displayFieldValue(fieldValue)}
      </li>
   ));
};

const displayFieldValue = (fieldValue: FieldValue): ReactNode => {
   if (Array.isArray(fieldValue))
      if (
         fieldValue.every(
            (item) => typeof item === 'number' || typeof item === 'string'
         )
      )
         return fieldValue.join(', ');
      else
         return fieldValue.map((item, index) => (
            <ul key={index}>{displaySingleField(item)}</ul>
         ));
   else if (fieldValue && typeof fieldValue === 'object')
      return displayFields(fieldValue);
   else
      return (
         <>
            {fieldValue === null || fieldValue === undefined
               ? 'null'
               : String(fieldValue)}
         </>
      );
};

const displaySingleField = (field: FieldValue): ReactNode => {
   if (Array.isArray(field) && field.every((item) => typeof item === 'number'))
      return field.join(', ');
   else if (field && typeof field === 'object') return displayFields(field);
   else return <>{field === null || field === undefined ? 'null' : field}</>;
};

const App: FC = () => {
   const [json, setJson] = useState<FieldObject[]>([]);

   const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
         try {
            const json = JSON.parse(reader.result as string);
            if (Array.isArray(json)) setJson(json);
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
            {json.map((item, key) => (
               <ul key={key}>{displayFields(item)}</ul>
            ))}
         </div>
      </main>
   );
};

export default App;
