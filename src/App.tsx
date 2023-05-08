import { ChangeEvent, ReactElement, ReactNode, useState } from 'react';

import './assets/scss/index.scss';

type Field = string | [] | object;

const App = (): ReactElement => {
   const [json, setJson] = useState<[]>([]);

   const displayFieldValue = (fieldValue: Field): string | ReactNode => {
      if (Array.isArray(fieldValue))
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
            : fieldValue;
   };

   const displaySingleField = (field: Field): ReactNode => {
      return Object.entries(field).map(([fieldName, fieldValue], key) => (
         <div key={key} style={{ marginLeft: '20px' }}>
            <strong>{fieldName}: </strong>
            {displayFieldValue(fieldValue as object)}
         </div>
      ));
   };

   const displayFields = (fields: Field): ReactNode => {
      return Object.entries(fields).map(([fieldName, fieldValue], key) => (
         <li key={key}>
            <strong>{fieldName}: </strong> {displayFieldValue(fieldValue)}
         </li>
      ));
   };

   const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
         const json = JSON.parse(reader.result as string);
         setJson(json);
      };
      reader.readAsText(e.target.files![0]);
   };

   return (
      <>
         <input type="file" accept=".json" onChange={handleFileUpload} />
         {json.map((item, key) => (
            <div className="container-field" key={key}>
               <ul>{displayFields(item)}</ul>
            </div>
         ))}
      </>
   );
};

export default App;
