import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { AiFillDelete, AiFillFileAdd } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { removeHTMLTags } from "../../utils/helper";
import "./SideBar.css";

function SideBar({ newNote, adding, notes, selectNote, deleteNote }) {
  const handleDeleteNote = (n) => {
    if (window.confirm(`Are you sure you want to delete: ${n.title}`)) {
      deleteNote(n);
    }
  };

  const signOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <Box className="sidebar-header">
        <Heading size="md">Note Lite</Heading>

        <AiFillFileAdd
          className="icon"
          onClick={newNote}
          disabled={adding}
          color="white"
          size="25px"
        />
      </Box>

      {notes &&
        notes.map((note) => (
          <Box key={note.id}>
            <Box className="all-notes">
              <Box>
                <Text
                  className="note-title"
                  cursor="pointer"
                  onClick={() => selectNote(note)}
                >
                  {note.title}
                </Text>
                <Text mt={4}>{removeHTMLTags(note.body).slice(0, 15)}...</Text>
              </Box>

              <Box className="delete-icon">
                <AiFillDelete
                  size="25px"
                  onClick={() => handleDeleteNote(note)}
                />
              </Box>
            </Box>
            <hr className="divider" />
          </Box>
        ))}

      <Box className="footer">
        <Text className="footer-text">Made with 💖 by Anup</Text>

        <FaSignOutAlt
          onClick={signOut}
          disabled={adding}
          color="white"
          size="25px"
          className="signout-icon"
        />
      </Box>
    </div>
  );
}

export default SideBar;
