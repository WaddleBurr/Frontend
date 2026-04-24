import "./App.css";
import {React} from "react";
import { createRoot } from 'react-dom/client'
function ClassForm(){
  return(
    <form>
      <label>
        Enter class name:
        <input type="text" />
      </label>
    </form>
  )
}
createRoot(document.getElementById('root')).render(
  <ClassForm />
);

export default ClassForm;
