import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, Button, Grid, TextareaAutosize } from '@material-ui/core';

const SendEmail = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClickSend = async() => {
        try{
            const response = await axios.post('https://bfid62yvk7.execute-api.us-east-1.amazonaws.com/auth/send-email', {
                title, description
            })
            handleReset();
        }catch (error){
            alert(error.message);
        }
        
    }

    const handleReset = async () => {
        setTitle("");
        setDescription("");
    }

    return(
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <Typography variant="h4">Send an email</Typography>
            <TextField
                label="Title"
                variant="outlined"
                style={{ width:500 }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br/>
            <TextareaAutosize
                label="Description"
                variant="outlined"
                sx={{ width:500, height:500 }}
                value={description}
                rows="25"
                minRows={10}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br/>
            <Button color="primary" variant="contained" onClick={handleClickSend}>Send</Button>
            <br/>
        </Grid>
    );
};

export default SendEmail;