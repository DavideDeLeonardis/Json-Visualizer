//Libraries
import { FC, ChangeEvent, useState, useRef } from 'react';

// Components
import Fields from './components/Fields';

// Types
import { FieldObject } from './types';

// SCSS
import './assets/scss/index.scss';

const App: FC = () => {
   const [jsonData, setJsonData] = useState<FieldObject[]>([]);
   const [textareaValue, setTextareaValue] = useState<string>('');
   const inputRef = useRef<HTMLInputElement>(null);

   // Handler file input uploaded
   const onInputFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
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

   // Parse json received and set json state
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
               onChange={onInputFileUpload}
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
                  - Remember to use <u>double quotes</u> and{' '}
                  <u>remove commas</u> from last properties in JSON.
               </div>
            </div>
         </div>

         <main>
            {jsonData.length == 0
               ? 'Visualize here'
               : jsonData.map((item, key) => <ul key={key}>{Fields(item)}</ul>)}
         </main>
      </div>
   );
};

export default App;
