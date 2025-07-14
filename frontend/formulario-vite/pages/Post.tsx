import React from "react";
import Header from "../src/components/Header";
import AuthorInfo from "../src/components/AuthorInfo";
import PostContent from "../src/components/PostContent";
import Footer from "../src/components/Footer";

const Post: React.FC = () => {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header />
      <main className="px-[94px]">
        <AuthorInfo />
        <PostContent />
        <Footer />
      </main>
    </div>
  );
};

export default Post;