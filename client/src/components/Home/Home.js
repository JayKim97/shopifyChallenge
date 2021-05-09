import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import Images from "../Images/Images";
import Form from "../Form/Form";
import ImageDetail from "../Images/ImageDetail/ImageDetail";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [editPic, setEditPic] = useState(false);
  console.log(`id desu ${currentId}`);
  console.log(`edit ${editPic}`);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          {currentId === 0 ? (
            <Grid item xs={12}>
              <Images setCurrentId={setCurrentId} setEditPic={setEditPic} />
            </Grid>
          ) : (
            <>
              {editPic === false ? (
                <ImageDetail
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              ) : (
                <Form
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  setEditPic={setEditPic}
                />
              )}
            </>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
