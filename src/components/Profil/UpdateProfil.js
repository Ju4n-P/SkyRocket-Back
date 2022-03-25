import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";
import userReducer from "../../reducers/user.reducer";
import usersReducer from "../../reducers/users.reducer";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const postsData = useSelector((state) => state.allPostsReducer);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1> Profil de {userData.pseudo}</h1>
        </Col>
        <Col>
          <h3>Bio</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={userData.picture} alt="user-pic" />
        </Col>
        <Col>
          {updateForm === false && (
            <>
              <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
              <Button onClick={() => setUpdateForm(!updateForm)}>
                Modifier bio
              </Button>
            </>
          )}
          {updateForm && (
            <>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Expliquez nous en quelques mots ce qui vous rend unique{" "}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>
                <Button onClick={handleUpdate}>Valider modifications</Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfil;
