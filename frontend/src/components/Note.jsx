import React from "react";
import "../styles/Note.css"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

function Note({ note, onDelete , onEdit }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
      <>
      <div className={note.is_completed?"card done":"card"}>
      <div className="card-header" style={{display:"flex",justifyContent:"space-between"}}>
         {note.is_completed ? <h2 className="card-title completed">{note.title}</h2>:<h2 className="card-title pending ">{note.title}</h2>}
         <div className="logo" style={{fontSize:"1.4rem"}}>
         {note.setreminder && !note.is_completed?"⏰":null}
         </div>
         
      </div>
      <div className="card-body">
        
          <p dangerouslySetInnerHTML={{ __html: note.body }} ></p>
          <div className="card-meta">
              <p><strong>Created by : </strong> {note.author.name}</p>
              <p><strong>Created at : </strong>{formattedDate}</p>
          </div>
      </div>
      <div className="card-footer">
         
          {note.is_completed?<button onClick={() => onEdit(note.id , note)} className="edit-btn-incomplete">Mark incomplete</button>:<button onClick={() => onEdit(note.id , note)} className="edit-btn-complete">Mark Complete</button>}
          <button onClick={() => onDelete(note.id)} className="delete-btn">Delete</button>
          
      </div>
  </div>

      </>
    );
}

export default Note
