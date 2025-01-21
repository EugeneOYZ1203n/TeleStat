import React, { useState } from "react";
import { Checkbox, Button, List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import { colors } from "../../config";

const ChatSelector = ({ chatNames, selectedChats, setSelectedChats }) => {

    const handleToggle = (chatName) => {
        const currentIndex = selectedChats.indexOf(chatName);
        let newSelected = [...selectedChats];

        if (currentIndex === -1) {
            newSelected.push(chatName); // Add if not selected
        } else {
            newSelected.splice(currentIndex, 1); // Remove if already selected
        }

        setSelectedChats(newSelected); 
    };

    // Select all chats
    const handleSelectAll = () => {
        setSelectedChats(chatNames); 
    };

    // Deselect all chats
    const handleDeselectAll = () => {
        setSelectedChats([]); 
    };

    return (
        <div>
        {/* Action Buttons */}
        <div style={{ marginBottom: "16px", marginTop: "16px" }}>
            <Button
            variant="contained"
            onClick={handleSelectAll}
            sx = {{marginRight: "8px", bgcolor: colors.primary, color: colors.black}}
            >
            Select All
            </Button>
            <Button
            variant="contained"
            onClick={handleDeselectAll}
            sx = {{marginRight: "8px", bgcolor: colors.secondary, color: colors.black}}
            >
            Deselect All
            </Button>
            <Typography sx = {{display: "inline-flex"}}>
                {selectedChats.length}/{chatNames.length}
            </Typography>
        </div>

        {/* List of Chats with Checkboxes */}
        <List>
            <div
                style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                }}
            >
            {chatNames.map((chatName) => (
            <div
                key={chatName}
                style={{
                    flex: "1 1 20%", // Adjusts width: roughly 3 columns
                    minWidth: "150px", // Minimum width for smaller screens
                }}
            >
                <ListItem key={chatName} sx={{width:"100%"}} disablePadding>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={selectedChats.includes(chatName)}
                        onChange={() => handleToggle(chatName)}
                    />
                    </ListItemIcon>
                    <ListItemText color={colors.white} primary={chatName} />
                </ListItem>
            </div>))}
            </div>
        </List>
        </div>
    );
};


export default ChatSelector