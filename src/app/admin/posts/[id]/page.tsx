import React from "react";

const PostPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container mx-auto py-5">
      <p className="text-[50px]">{params.id}</p>
    </div>
  );
};

export default PostPage;
