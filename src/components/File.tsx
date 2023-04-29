import { useState, ChangeEvent } from 'react';

import classes from './file.module.scss';

const File = () => {
   const [file, setFile] = useState(null);
	const [JsonToHandle, setJsonToHandle] = useState();
	

   return (
      <div className={classes.container}>
         <input type="file" onChange={() => null} />
         <br />
         <textarea
            style={{ height: '200px', width: '100%', resize: 'none' }}
            value={JsonToHandle}
            onChange={() => null}
         ></textarea>
         <ul></ul>
      </div>
   );
};

export default File;
