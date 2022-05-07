import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dashboard from "../auth/dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faVideoCamera,
  faCalendarCheck,
  faGlobeAfrica,
  faFootballBall,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

const CurrentPost = () => {
  const params = useParams();

  //State hooks for obtaining and mapping data from the server
  const [title, setTitle] = useState("");
  const [ID, setID] = useState(0);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [media1, setMedia1] = useState("");
  const [media2, setMedia2] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [subheading1, setSubheading1] = useState("");
  const [subheading2, setSubheading2] = useState("");
  const [subheading3, setSubheading3] = useState("");
  const [date, setDate] = useState(0);

  //Time conversion
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  //State hooks for blog comments

  const [commenter, setCommenter] = useState({
    username: "",
    comment: "",
  });

  const [extractComment, setExtractComment] = useState([]);
  //Get request 1
  useEffect(() => {
    axios
      .get(`https://ucheabba89.netlify.app/blog/${params.ID}`)
      .then((res) => {
        console.log(res.statusText);
        const postData = res.data;
        setTitle(postData.title);
        setID(postData.ID);
        setCategory(postData.category);
        setAuthor(postData.author);
        setParagraph1(postData.paragraph1);
        setParagraph2(postData.paragraph2);
        setParagraph3(postData.paragraph3);
        setSubheading1(postData.subheading1);
        setSubheading2(postData.subheading2);
        setSubheading3(postData.subheading3);
        setDate(postData.updatedAt);
        setMedia1(postData.media1);
        setMedia2(postData.media2);
      })
      .catch((err) => {
        console.log(err.request);
        console.log(err.response);
        console.log(err.message);
      });
  }, [params.ID]);

  const submitComment = () => {
    axios
      .post(`https://ucheabba89.netlify.app/comments`, commenter)
      .then((res) => {
        console.log(res.statusText);
        console.log("Comment successfully uploaded");
        setCommenter(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetChComments = async () => {
    try {
      const data = await axios.get(`http://localhost:4000/comments`);
      console.log(data.statusText);
      setExtractComment(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetChComments();
  }, []);
  return (
    <>
      <Dashboard />
      <div className="content-holder">
        <div className="post-holder">
          <h2>{title}</h2>
          <div className="post-span-holder">
            <span>
              <FontAwesomeIcon icon={faUserLarge} />
              {"  "}
              Author: {"  "} {author}
            </span>
            <span>
              {category === "Entertainment" ? (
                <FontAwesomeIcon icon={faVideoCamera} />
              ) : category === "Sports" ? (
                <FontAwesomeIcon icon={faFootballBall} />
              ) : category === "Politics" ? (
                <FontAwesomeIcon icon={faGlobeAfrica} />
              ) : category === "Technology" ? (
                <FontAwesomeIcon icon={faMicrochip} />
              ) : (
                !category
              )}
              {"  "}
              Category: {category}
            </span>
            <span>
              <FontAwesomeIcon icon={faCalendarCheck} />
              {"  "}
              Created:
              {"  "}
              {day}
              {"-"}
              {month}
              {"-"}
              {year}
            </span>
            <span>Post ID: {ID}</span>
          </div>
          <hr
            style={{
              borderRadius: "15px",
              border: "1px solid rgb(250, 250, 250)",
            }}
          ></hr>
          <div className="post-body">
            <img className="post-image-display" src={media1} alt="Post" />

            <img className="post-image-display" src={media2} alt="Post" />

            <article className="post-para">
              <h2>{subheading1}</h2>
              <p>{paragraph1}</p>
              <hr></hr>
              <h2>{subheading2}</h2>
              <p>{paragraph2}</p>
              <hr></hr>
              <h2>{subheading3}</h2>
              <p>{paragraph3}</p>
            </article>
          </div>
          <hr className="pre-comment-hr"></hr>

          <div className="comment-list">
            <h4>Comments</h4>
            {extractComment.map((data) => (
              <div className="each-comment" key={data._id}>
                <h5>
                  <div className="comment-avatar">
                    {data.username[0]}
                    
                  </div>
                  
                  {"   "}
                  {data.username}
                  {"   "}
                  <div style={{display: "inline-flex", marginLeft: "20px"}}>
                
                  {new Date(data.updatedAt).getDay()} -{" "}
                  {new Date(data.updatedAt).getMonth() + 1} -{" "}
                  {new Date(data.updatedAt).getFullYear()}
                  </div>
                </h5>
                <p className="comment-para">{data.comment}</p>
              </div>
            ))}
          </div>
          <hr className="pre-comment-hr"></hr>
          <div className="comments">
            <h4>Write a comment</h4>
            <form onSubmit={submitComment}>
              <label>Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={commenter.username}
                onChange={(e) =>
                  setCommenter({ ...commenter, username: e.target.value })
                }
              />
              <label>Comment:</label>
              <textarea
                className="textarea-comment"
                name="comment"
                value={commenter.comment}
                onChange={(e) =>
                  setCommenter({ ...commenter, comment: e.target.value })
                }
                placeholder="Write comment here"
                minLength={1}
                maxLength={700}
              />
              <button type="submit">Post Comment</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentPost;
