import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
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
        <label htmlFor="create-author">Author: </label>
        <input
          type="text"
          name="create-author"
          id="create-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
        disabled={!title}
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
