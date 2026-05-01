import "./App.css";
import {React} from "react";
import { createRoot } from 'react-dom/client'
function ClassForm(){
  return(
    <form>
      <label>
        Enter course name:
        <input type="text" id = 'coursetext'/>
      </label>
        <label>
        Enter room name:
        <input type="text" id = 'roomtext'/>
      </label>
      <label>
        Enter teacher name:
        <input type="text" id = 'teachertext'/>
      </label>
    </form>

  )
}
createRoot(document.getElementById('root')).render(
  <ClassForm />
);
export default ClassForm;