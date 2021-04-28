import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Quill from "react-quill";
import "./Editor.css";
import { MdTitle } from "react-icons/md";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["link", "image", "blockquote", "code-block"],
  ["clean"],
];

function Editor({ selectedNote, noteUpdate, user }) {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setBody(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote]);

  useEffect(() => {
    const timer = setTimeout(() => {
      noteUpdate(id, { title, body });
    }, 1500);

    return () => clearTimeout(timer);
  }, [noteUpdate, title, body, id]);

  const updateBody = (val) => {
    setBody(val);
  };

  const updateTitle = (val) => {
    setTitle(val);
  };

  return (
    <Box className="editor-container">
      <Box className="editor-header">
        <Box>
          <MdTitle className="title-icon" />
        </Box>
        <input
          className="editor-title-input"
          value={title ? title : ""}
          onChange={(e) => updateTitle(e.target.value)}
        />
        {user ? (
          <Box className="user-icon" color="white">
            {user.email.charAt(0).toUpperCase()}
          </Box>
        ) : null}
      </Box>
      <Quill
        theme="snow"
        value={body}
        style={{ height: "87vh" }}
        onChange={updateBody}
        modules={{ toolbar: TOOLBAR_OPTIONS }}
      />
    </Box>
  );
}

export default Editor;
