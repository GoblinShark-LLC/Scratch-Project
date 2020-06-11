import React from 'react'; 
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

<<<<<<< HEAD
const Comment = ({ id, avatar, author, edited, createdAt, lastUpdated, body}) => {
=======
const Comment = ({ id, body, icon, author, edited, createdAt, lastUpdated }) => {
  console.log(id, body, icon, author, edited, createdAt, lastUpdated)
>>>>>>> master
  return (
    <Paper style={{ padding: "10px 20px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <h1>🦈</h1>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            {edited}
            <h2 style={{ margin: 0, textAlign: "left" }}>{author}</h2>
            <Divider variant="fullWidth"/>
            <p style={{ textAlign: "left" }}>{body}</p>
            <Divider variant="fullWidth"/>
            <h6 style={{ textAlign: "right", color: "gray", marginBottom:"-20px", marginTop:"-1px" }}>
            createdAt : {createdAt}
            </h6>
            <h6 style={{ textAlign: "right", color: "gray" }}>
            lastUpdated : {lastUpdated}
            </h6>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Comment; 