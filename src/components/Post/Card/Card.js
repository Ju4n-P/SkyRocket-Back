import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Utils";

const Card = ({ post }) => {
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <div class="col">

    <div class="card">
      <img
        class="card-img-top"
        src="https://source.unsplash.com/1600x900/?startup,meeting"
        alt="Card image cap"
      />
      <div class="card-body">
        <p class="card-text">
          <ul>
            <p>{post.message}</p>
            <li class="mt-10">crée le {post.createdAt}</li>
            <li class="">Participants : {post.likers.length}</li>
            <li>
              posté par{" "}
              {!isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.pseudo;
                    else return null;
                  })
                  .join("")}
            </li>
          </ul>
        </p>
      </div>
      </div>
    </div>
  )
  
};

export default Card;
