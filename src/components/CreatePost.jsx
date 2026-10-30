import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import { useAuth } from "../contexts/AuthContext"; 

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [contents, setContents] = useState("");
  
  const [token] = useAuth(); 

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: (newPost) => createPost(newPost, token), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setAuthor("");
      setContents("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate({ title, author, contents });
  };

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <br />
      <div>
        <label htmlFor="create-contents">Contents: </label>
        <textarea
          name="create-contents"
          id="create-contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
      </div>
      <br />
      <br />
      <input
        type="submit"
        value={createPostMutation.isPending ? "Creating..." : "Create"}
        disabled={!title || !token} // Disable if not logged in
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  );
}