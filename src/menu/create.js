import React, { useState } from "react";
import axios from "axios";
import Dashboard from "../auth/dashboard";

const Create = () => {
  const [createPost, setCreatePost] = useState({
    title: "",
    ID: new Date().getTime(),
    category: "default",
    author: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    subheading1: "",
    subheading2: "",
    subheading3: "",
    media1: "",
    media2: "",
  });

  //Post request
  const handlePost = () => {
    axios
      .post("http://localhost:4000/blog", createPost)
      .then((res) => {
        setCreatePost(res.data);
        console.log(res.data);
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err.request);
        console.log(err.message);
        console.log(err.response);
      });
  };

  return (
    <>
      <Dashboard />
      <div className="content-holder">
        <form
          className="create-post"
          encType="multipart/form-data"
          onSubmit={handlePost}
        >
          <h2>Write new post</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={createPost.title}
            onChange={(e) =>
              setCreatePost({ ...createPost, title: e.target.value })
            }
          />
          <label htmlFor="ID">ID</label>
          <input
            type="number"
            id="ID"
            name="ID"
            value={createPost.ID}
            onChange={(e) =>
              setCreatePost({ ...createPost, ID: e.target.value })
            }
          />
          <label htmlFor="category">Category</label>
          <select
            className="category"
            id="selection"
            value={createPost.category}
            onChange={(e) =>
              setCreatePost({ ...createPost, category: e.target.value })
            }
          >
            <option value="default" name="default">
              --Select--
            </option>
            <option value="Technology" name="Technology">
              Technology
            </option>
            <option value="Politics" name="Politics">
              Politics
            </option>
            <option value="Sports" name="Sports">
              Sports
            </option>
            <option value="Entertainment" name="Entertainment">
              Entertainment
            </option>
          </select>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={createPost.author}
            onChange={(e) =>
              setCreatePost({ ...createPost, author: e.target.value })
            }
          />
          <label htmlFor="media">Post media</label>
          <input
            type="text"
            name="media1"
            value={createPost.media1}
            onChange={(e) =>
              setCreatePost({ ...createPost, media1: e.target.value })
            }
          ></input>
          <input
            type="text"
            name="media2"
            value={createPost.media2}
            onChange={(e) =>
              setCreatePost({ ...createPost, media2: e.target.value })
            }
          ></input>
          <label htmlFor="post">Post Body</label>
          <input
            type="text"
            name="subheading1"
            placeholder="Enter sub header 1 title"
            value={createPost.subheading1}
            onChange={(e) =>
              setCreatePost({ ...createPost, subheading1: e.target.value })
            }
          />
          <textarea
            className="textarea-post"
            spellCheck="true"
            autoCorrect="enable"
            name="post"
            value={createPost.paragraph1}
            onChange={(e) =>
              setCreatePost({ ...createPost, paragraph1: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            name="subheading2"
            placeholder="Enter sub header 2 title"
            value={createPost.subheading2}
            onChange={(e) =>
              setCreatePost({ ...createPost, subheading2: e.target.value })
            }
          />
          <textarea
            className="textarea-post"
            spellCheck="true"
            autoCorrect="enable"
            name="post2"
            value={createPost.paragraph2}
            onChange={(e) =>
              setCreatePost({ ...createPost, paragraph2: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            name="subheading3"
            placeholder="Enter sub header 3 title"
            value={createPost.subheading3}
            onChange={(e) =>
              setCreatePost({ ...createPost, subheading3: e.target.value })
            }
          />
          <textarea
            className="textarea-post"
            spellCheck="true"
            autoCorrect="enable"
            name="post2"
            value={createPost.paragraph3}
            onChange={(e) =>
              setCreatePost({ ...createPost, paragraph3: e.target.value })
            }
          ></textarea>
          <button className="post-btn" type="submit">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
