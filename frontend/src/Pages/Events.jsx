import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
const Events = () => {
  const [eventImg, setEventImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  async function fetchEvents(e){
    try{
        const response=await axios.get(`http://localhost:5000/api/courses`);
        setEvents(response.data);
    }
    catch(error){
        alert('No data Found');
    }
  }
  const handleevent = async (e) => {
    e.preventDefault();
    const eventData = {
      eventImg,
      title,
      description,
    };
    try {
      if (editId) {
        const response = await axios.put(
          `http://localhost:5000/api/events/${editId}`, eventData
        );

        alert(response.data.message);
        setEditId(null);
      }
      else {
        const response = await axios.post(
          `http://localhost:5000/api/events/${editId}`, eventData
        );
        alert(response.data.message);
      }
      setEventImg("");
      setTitle("");
      setDescription("");

      fetchEvents();

    }
    catch (error) {
      alert(error.response.message);
    }
  };
  return (
    <div>
      <div className='events-banner'>
        <h2>Events</h2>
      </div>
      <form onSubmit={handleevent}>
        <input type="text"
          placeholder='image-url'
          value={eventImg}
          onChange={(e) => setEventImg(e.target.value)}
          className='form-control'
        />
        <br></br>

        <input type="text"
          placeholder='Title of Event'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control'
        />
        <br></br>

        <input type="text"
          placeholder='description of event'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='form-control'
        />
        <br></br>

        <button type="submit">
          {editId ? "Update Course" : "Add Course"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setEventImg("");
              setTitle("");
              setDescription("");
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>
      <hr />
      <h2>Event List</h2>

      {events.length === 0 ? (
        <p>No Events found</p>
      ) : (
        <div>
          {events.map((event) => (
            <div
              key={event._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <img
                src={event.eventImg}
                alt={event.title}
                width="200"
              />

              <h3>{event.title}</h3>

              <p>{event.description}</p>

              <button onClick={() => handleEdit(event)}>
                Edit
              </button>

              <button onClick={() => handleDelete(event._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Events