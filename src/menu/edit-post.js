import React, { useState, useEffect } from "react";
import Dashboard from "../auth/dashboard";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import Dashboard from "../dashboard";

const EditPost = () => {
  const params = useParams();
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ID, setID] = useState(0);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [media, setMedia] = useState([]);
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [subheading1, setSubheading1] = useState("");
  const [subheading2, setSubheading2] = useState("");
  const [subheading3, setSubheading3] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/blog/${params.ID}`)
      .then((res) => {
        console.log(res.statusText);
        const postData = res.data;
        setTitle(postData.title);
        setID(postData.ID);
        setCategory(postData.category);
        setAuthor(postData.author);
        setMedia(postData.media);
        setParagraph1(postData.paragraph1);
        setParagraph2(postData.paragraph2)
        setParagraph3(postData.paragraph3)
        setSubheading1(postData.subheading1)
        setSubheading2(postData.subheading2)
        setSubheading3(postData.subheading3)
      })
      .catch((err) => {
        console.log(err.request);
        console.log(err.response);
        console.log(err.message);
      });
  }, [params.ID]);

  //Image Binary Data Reader Logic

  const handleUpdate = () => {
    axios
      .put(`http://localhost:4000/blog/${params.ID}`, {
        title,
        ID,
        category,
        author,
        media,
        paragraph1,paragraph2,paragraph3,subheading1,subheading2,subheading3
      })
      .then((res) => {
        console.log(res.statusText);
        navigate("dashboard/admin/");
      })
      .catch((err) => {
        console.log(err.request);
        console.log(err.response);
        console.log(err.message);
      });
  };
  return (
    <>
      <Dashboard />
      <div className="content-holder">
        <form
          className="create-post"
          encType="multipart/form-data"
          onSubmit={handleUpdate}
        >
          <h2>Edit post: {ID}</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="ID">ID</label>
          <input
            type="number"
            id="ID"
            name="ID"
            value={ID}
            onChange={(e) => setID(e.target.value)}
          />
          <label htmlFor="category">Category</label>
          <select
            className="category"
            id="selection"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="post">Post Body</label>
          <input
            type="text"
            name="subheading1"
            placeholder="Enter sub header 1 title"
            value={subheading1}
            onChange={(e) =>
              setSubheading1(e.target.value)
            }
          />
          <textarea
            className="textarea-post"
            spellCheck="true"
            autoCorrect="enable"
            name="post"
            value={paragraph1}
            onChange={(e) =>
              setParagraph1(e.target.value)
            }
          ></textarea>
          <input
            type="text"
            name="subheading2"
            placeholder="Enter sub header 2 title"
            value={subheading2}
            onChange={(e) =>
              setSubheading2(e.target.value)
            }
          />
          <textarea
            className="textarea-post"
            spellCheck="true"
            autoCorrect="enable"
            name="post2"
            value={paragraph2}
            onChange={(e) =>
              setParagraph2(e.target.value)
            }
          ></textarea>
          <input
            type="text"
            name="subheading3"
            placeholder="Enter sub header 3 title"
            value={subheading3}
            onChange={(e) =>
              setSubheading3(e.target.value)
            }
          />
          <textarea
            className="textarea-post"
            spellCheck="true"
            autoCorrect="enable"
            name="post2"
            value={paragraph3}
            onChange={(e) =>
              setParagraph3(e.target.value)
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

export default EditPost;
