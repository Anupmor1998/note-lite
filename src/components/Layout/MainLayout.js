import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Editor from "../Editor/Editor";
import SideBar from "../SideBar/SideBar";
import "./MainLayout.css";
import { firestore, timestamp } from "../../firebaseConfig/firebaseConfig";
import { Image } from "@chakra-ui/image";
import notes2 from "../../images/notes2.svg";

function MainLayout({ user }) {
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    firestore
      .collection(`${user?.uid}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const notes = snap.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        setNotes(notes);
      });
  }, [user]);

  const selectNote = (note) => {
    setSelectedNote(note);
  };

  const newNote = async () => {
    setAdding(true);
    let note = {
      title: "Untitled",
      body: "",
    };
    const newFromDB = await firestore.collection(`${user?.uid}`).add({
      title: note.title,
      body: note.body,
      createdAt: timestamp,
    });

    const newId = newFromDB.id;
    note = { ...note, id: newId };
    setNotes([note, ...notes]);
    setAdding(false);
  };

  const deleteNote = async (note) => {
    setNotes(notes.filter((_note) => _note.id !== note.id));
    if (selectedNote && selectedNote?.id === note.id) {
      setSelectedNote(null);
    }

    await firestore.collection(`${user?.uid}`).doc(note.id).delete();
  };

  const noteUpdate = async (id, note) => {
    if (id && note) {
      await firestore.collection(`${user?.uid}`).doc(id).set(
        {
          title: note.title,
          body: note.body,
        },
        { merge: true }
      );
    }
  };

  return (
    <Box className="main-layout">
      <Box className="sidebar">
        <SideBar
          newNote={newNote}
          adding={adding}
          notes={notes}
          selectNote={selectNote}
          deleteNote={deleteNote}
        />
      </Box>
      <Box className="editor">
        {selectedNote ? (
          <Editor
            selectedNote={selectedNote}
            noteUpdate={noteUpdate}
            user={user}
          />
        ) : (
          <Box className="note-img">
            <Image className="image" src={notes2} draggable={false} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default MainLayout;
