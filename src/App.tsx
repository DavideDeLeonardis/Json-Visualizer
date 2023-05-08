import { ChangeEvent, ReactElement, ReactNode, useState } from 'react';
import './assets/scss/index.scss';

interface FieldObject {
   [fieldName: string]: Field | null;
}

type Field = string | number | boolean | FieldArray | FieldObject | null;

type FieldArray = Array<Field>;

const App = (): ReactElement => {
   const [json, setJson] = useState<[]>([]);

   const displayFieldValue = (fieldValue: Field): string | ReactNode => {
      if (Array.isArray(fieldValue))
         if (
            fieldValue.every(
               (item) => typeof item === 'number' || typeof item === 'string'
            )
         )
            return fieldValue.join(', ');
         else
            return fieldValue.map((item, index) => (
               <div key={index}>
                  {displaySingleField(item)}
                  <br />
               </div>
            ));
      else if (fieldValue && typeof fieldValue === 'object')
         return displayFields(fieldValue);
      else
         return fieldValue === null || fieldValue === undefined
            ? 'null'
            : String(fieldValue);
   };

   const displaySingleField = (field: Field): ReactNode => {
      if (
         Array.isArray(field) &&
         field.every((item) => typeof item === 'number')
      )
         return field.join(', ');

      if (field && typeof field === 'object')
         return Object.entries(field as object).map(
            ([fieldName, fieldValue], key) => (
               <div key={key} style={{ marginLeft: '20px' }}>
                  <strong>{fieldName}: </strong>
                  {displayFieldValue(fieldValue as Field)}
               </div>
            )
         );

      return <>{field === null || field === undefined ? 'null' : field}</>;
   };

   const displayFields = (fields: FieldObject): ReactNode => {
      return Object.entries(fields).map(([fieldName, fieldValue], key) => (
         <li key={key}>
            <strong>{fieldName}: </strong> {displayFieldValue(fieldValue)}
         </li>
      ));
   };

   const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
      const reader = new FileReader();
      reader.onload = () => {
         const json = JSON.parse(reader.result as string);
         setJson(json);
      };
      reader.readAsText(e.target.files![0]);
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
