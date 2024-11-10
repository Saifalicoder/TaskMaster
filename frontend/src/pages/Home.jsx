import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from '../components/Navbarr';
import Container from 'react-bootstrap/Container'; // Importing Container
import { Link } from "react-router-dom";
import { USER } from "../constants";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Font, TodoList } from 'ckeditor5';
import { SlashCommand } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

function Home() {
    const [notes, setNotes] = useState([]);
    const [allNotes, setAllNotes] = useState([]); // Keep a copy of all notes
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [editorInstance, setEditorInstance] = useState(null);
    const [setReminder, setSetReminder] = useState(false);
    const [duedate, setDueDate] = useState('');
    const user = JSON.parse(localStorage.getItem(USER));

   


    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/todos/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                setAllNotes(data); // Store original notes separately
                console.log(data);
            })
            .catch();
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/todos/${id}/`)
            .then((res) => {
                // if (res.status === 204) alert("Note deleted!");
                // else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const editNote = (id ,note) => {
        console.log("hi loading edit")
        const is_completed = !note.is_completed;

        api
            .patch(`/api/todos/${id}/`,{is_completed})
            .then((res) => {
                // if (res.status === 20) alert("Note deleted!");
                // else alert("Failed to delete note.");
                console.log(res)
                getNotes();
            })
            .catch((error) => alert(error));
    };
    
    const onFilter = (status) => {
        switch(status){
                 case "all":
                    console.log("all")
                    setNotes(allNotes);
                    break;
                 case "pending":
                    const pendingNotes = allNotes.filter((note) => note.is_completed === false);
                    setNotes(pendingNotes);
                    break;
                 case "completed":
                    const completedNotes = allNotes.filter((note) => note.is_completed === true);
                    setNotes(completedNotes);
                    break;
                default:
                    setNotes(allNotes); // Default case resets the filter
                    break;
        }
           
    }

    const createNote = (e) => {
        e.preventDefault();
        const todo = {
            body, title, duedate: setReminder?duedate:null,setreminder:setReminder
        }
        api
            .post("/api/todos/", todo)
            .then((res) => {
                if (res.status === 201);
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => console.log(err));
            if (editorInstance) {
                editorInstance.setData(''); // This will clear the editor content
            }
        setBody("");
        setTitle("");
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="main">  
   
            <form className="todoform" onSubmit={createNote}>
                <h3 style={{color:"red" , textAlign:"center"}}>Add Todo</h3>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="body">body:</label>
                <br />
                {/* <textarea
                    id="body"
                    name="body"
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea> */}
               <CKEditor 
        editor={ ClassicEditor }
        config={ {
            plugins: [ Essentials, Bold, Italic, Font, Paragraph, TodoList ],
            toolbar: [
                'undo', 'redo', '|', 'bold', 'italic', '|',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',"todoList"
            ]
  
        } }
        data=''
        contextItemMetadata={{
            name: 'editor1',
            yourAdditionalData: 2
        }}
        onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);  // Store the editor content in state
            console.log({ event, editor, data });  // For debugging
          }}
          onReady={(editor) => {
            setEditorInstance(editor); // Save the editor instance for later use
        }}
      />
                <br />
                <div>
                <label class={setReminder?"btn btn-primary":"btn btn-outline-primary"} for="btnradio1">
                    <input
                        type="checkbox"
                        id="btnradio1"
                        name="setreminder"
                        className="btn-check"
                        checked={setReminder}
                        onChange={() => setSetReminder(!setReminder)}
                    />Set reminder ⏰
                    </label>
            </div>
            {setReminder && (
                <div>
                    <label>Due Date:</label>
                    <input
                        type="datetime-local"
                        value={duedate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required={setReminder}
                    />
                </div>
            )}
             <div className="btncontainer" style={{textAlign:"center"}}>
             <input type="submit" style={{backgroundColor:"#fabf3e", color:"while",fontWeight:"600" , width:"200px"}} value="Submit"></input>
             </div>
            </form>
            <hr />

            <div className="container" style={{backgroundColor:"rgb(223 210 246)", padding:"50px" , minHeight:"87vh" , borderRadius:"30px"}}>
                
                <div className="top-header" > {user.first_name?<h2 style={{fontWeight:"600"}}>Welcome {user?.first_name} </h2>:<h2 style={{fontWeight:"600"}}>Todo List</h2>}
                <div className="filter-buttons">
                <button onClick={() => onFilter("all")} className="filter-btn">All notes</button>
                <button onClick={() => onFilter("pending")} className="filter-btn">Pending</button>
                <button onClick={() => onFilter("completed")} className="filter-btn">Completed</button>
                </div>
                </div>
               <hr />   
                <div className="container notes-container" >
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} onEdit={editNote} key={note.id} />
                ))}
                </div>
            </div>
           
        </div>
        </>
    );
}

export default Home;
