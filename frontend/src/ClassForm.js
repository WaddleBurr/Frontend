import "./App.css";
import {React} from "react";
import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react';
const  ClassForm = () => {
  const API_BASE_URL = 'http://10.81.224.195:5000/api/classes';
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [formData, setFormData] = useState({ class_name: '', teacher: '', subject: '', classroom: '', classid: '', description: ''    });


      // READ (Get all classes)
    const fetchClasses = async () => {
        try {
            const res = await fetch(API_BASE_URL);
            const data = await res.json();
            setClasses(data);
        } catch (err) {
            console.error("Error fetching classes:", err);
        }
    };

    useEffect(() => { fetchClasses(); }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleClear = () => {
        setSelectedClass(null);
        setFormData({ class_name: '', teacher: '', subject: '', classroom: '', classid: '', description: ''});
    };

    const handleSelect = (classes) => {
        setSelectedClass(classes);
        setFormData({ 
            class_name: classes.class_name, 
            teacher: classes.teacher, 
            subject: classes.subject, 
            classroom: classes.classroom,
            classid: classes.classid,
            description: classes.description
        });
    };
    // CREATE (POST)
    const handleCreate = async () => {
        const res = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            fetchClasses(); 
            handleClear();
        }
    };
    // UPDATE (PUT)
    const handleUpdate = async () => {
        const res = await fetch(`${API_BASE_URL}/${selectedClass._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            fetchClasses(); 
            handleClear();
        }
    };
    // DELETE (Delete)
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchClasses();
                if (selectedClass?._id === id) handleClear();
            }
        }
    };

  return(
    <form>
      <label>
        Enter class name:
        <input name="class_name" value={classes.class_name} onChange={handleChange} id = 'class_name' className="form-control"/>
      </label>
      <br></br>
      <label>
        Enter teacher name:
        <input name="teacher" value={classes.teacher} onChange={handleChange} id = 'teacher' className="form-control"/>
      </label>
      <br></br>
      <label>
        Enter subject name:
        <input name="subject" value={classes.subject} onChange={handleChange} id = 'subject' className="form-control"/>
      </label>
      <br></br>
        <label>
        Enter room name: 
        <input name="classroom" value={classes.classroom} onChange={handleChange} id = 'classroom' className="form-control"/>
      </label>
      <br></br>
        <label>
        Enter classid:
        <input name="classid" value={classes.classid} onChange={handleChange} id = 'classid' className="form-control"/>
      </label>
      <br></br>
        <label>
        Enter description:
        <input name="description" value={classes.description} onChange={handleChange} id = 'description' className="form-control"/>
      </label>
                <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-primary" onClick={handleCreate} disabled={selectedClass !== null}>
                        Add New Class
                    </button>
                    <button className="btn btn-success" onClick={handleUpdate} disabled={selectedClass === null}>
                        Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={handleClear}>
                        Clear Form
                    </button>
                </div>
            <div className="list-group shadow-sm">
                {classes.map(classes => (
                    <div key={classes._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-0">{classes.class_name}</h5>
                            <small className="text-muted">{classes.teacher} | {classes.subject} | {classes.classroom} | {classes.classid} | {classes.description}</small>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleSelect(classes)}>Edit</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(classes._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
      </form>


  )
}
createRoot(document.getElementById('root')).render(
  <ClassForm />
);
export default ClassForm;