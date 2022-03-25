import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import Card from "../../components/Post/Card/Card"


const Thread = () => {
  const posts = useSelector((state) => state.postReducer);

  return (
    <div class="container px-4 py-5" id="custom-cards">
      <h2 class="pb-2 border-bottom">{}</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </div>
    </div>
  );
};

export default Thread;
