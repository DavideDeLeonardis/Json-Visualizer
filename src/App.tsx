//Libraries
import { FC, ChangeEvent, ReactNode, useState, useRef } from 'react';

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
         <span className="key">{fieldName}</span>:{' '}
         <span className="type">
            {fieldValue === null || undefined
               ? 'null'
               : Array.isArray(fieldValue)
               ? '[ ]'
               : typeof fieldValue === 'object'
               ? '{ }'
               : typeof fieldValue}
         </span>
         {' --> '}
         <div className="value">{renderFieldValue(fieldValue)}</div>
      </li>
   ));
};

// Render json properties VALUES
/**
 * @param JsonPropertyValue: FieldValue
 * @returns ReactNode
 */
const renderFieldValue = (fieldValue: FieldValue): ReactNode => {
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
   else if (fieldValue && typeof fieldValue === 'object')
      return <ul>{renderFields(fieldValue)}</ul>;
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
   if (Array.isArray(field) && field.every((item) => typeof item === 'number'))
      return field.join(', ');
   else if (field && typeof field === 'object') return renderFields(field);
   else return <>{field === null || field === undefined ? 'null' : field}</>;
};

const App: FC = () => {
   const [jsonData, setJsonData] = useState<FieldObject[]>([]);
   const [textareaValue, setTextareaValue] = useState<string>('');
   const inputRef = useRef<HTMLInputElement>(null);

   // Handle and convert file input uploaded
   const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
      const file: File | undefined = e.target.files?.[0];
      if (!file) return;

      const reader: FileReader = new FileReader();
      reader.onload = () => setJsonDataHandler(reader.result);
      reader.readAsText(file);
   };

   // Handler for textarea insertion
   const onTextareaValueChange = (e: ChangeEvent<HTMLTextAreaElement>): void =>
      setTextareaValue(e.target.value);

   // Visualize JSON on button click
   const visualizeTextareaValue = (): void => {
      setJsonDataHandler(textareaValue);
      if (inputRef.current) inputRef.current.value = '';
   };

   // Manage json received and set json state
   const setJsonDataHandler = (value: string | ArrayBuffer | null): void => {
      try {
         const json = JSON.parse(value as string);

         if (!Array.isArray(json)) setJsonData([json]);
         else setJsonData(json);
      } catch (error) {
         alert('Errore nella lettura del file JSON. Usa il formato corretto.');
      }
   };

   return (
      <div className="container">
         <h1>Insert a JSON file in the input box, or write your own JSON</h1>

         <div className="header">
            <input
               type="file"
               ref={inputRef}
               accept=".json"
               onChange={handleFileUpload}
            />
            <span>or</span>

            <div>
               <div className="textarea-container">
                  <textarea
                     placeholder="Write in JSON"
                     value={textareaValue}
                     onChange={onTextareaValueChange}
                  ></textarea>
                  <button onClick={visualizeTextareaValue}>Visualize</button>
               </div>
               <div className="tips">
                  - Remember to use <u>double quotes</u> in JSON and{' '}
                  <u>remove commas</u> from last properties.
               </div>
            </div>
         </div>

         <main>
            {jsonData.length == 0
               ? 'Visualize here'
               : jsonData.map((item, key) => (
                    <ul key={key}>{renderFields(item)}</ul>
                 ))}
         </main>
      </div>
   );
};

export default App;
