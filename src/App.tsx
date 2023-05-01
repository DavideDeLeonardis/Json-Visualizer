import { ChangeEvent, ReactNode, useState } from 'react';
import './assets/scss/index.scss';

interface File {
   [key: string]: File | string;
}

type TreeNode = {
   name: string;
   children?: TreeNode[];
};

function objectToTree(data: object | any[]): TreeNode[] {
   const isArray = Array.isArray(data);

   return Object.entries(data).map(([key, value]) => {
      const node: TreeNode = { name: isArray ? `[${key}]` : key };

      if (value && (Array.isArray(value) || typeof value === 'object')) {
         node.children = objectToTree(value);
      }

      return node;
   });
}

const App = (): ReactNode => {
   const [jsonData, setJsonData] = useState<File | null>(null);

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const reader = new FileReader();
      reader.readAsText(e.target.files![0]);
      reader.onload = (e) =>
         setJsonData(JSON.parse(e.target!.result as string));
   };

   const displayProperty = (file: File): ReactNode => {
      const nodes = objectToTree(file);

      const renderTreeNodes = (nodes: TreeNode[]) => {
         return nodes.map((node) => {
            return (
                  <li key={node.name}>
                     {node.name}
                     {node.children && (
                        <ul style={{ marginLeft: '20px' }}>
                           {renderTreeNodes(node.children)}
                        </ul>
                     )}
                     <br />
                  </li>
            );
         });
      };

      return <ul>{renderTreeNodes(nodes)}</ul>;
   };

   return (
      <div className="container">
			<input type="file" onChange={handleFileChange} />
			<br />
         {jsonData && <div>{displayProperty(jsonData)}</div>}
      </div>
   );
};

export default App;
