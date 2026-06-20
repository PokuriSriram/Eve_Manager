import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
const Events = () => {
  const [Eventimage, setEventImg] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  async function fetchEvents(e){
    try{
        const response=await axios.get(`http://localhost:5000/api/events`);
        setEvents(response.data);
    }
    catch(error){
        alert('No data Found');
    }
  };
  useEffect(() => {
    fetchEvents();
}, []);
  const handleevent = async (e) => {
    e.preventDefault();
    const eventData = {
      Eventimage,
      Title,
      Description,
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
          "http://localhost:5000/api/events", eventData
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


  const handleEdit = (event) => {
    setEditId(event._id);
    setEventImg(event.Eventimage);
    setTitle(event.Title);
    setDescription(event.Description);
};

const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await axios.delete(
            `http://localhost:5000/api/events/${id}`
        );

        alert(response.data.message);

        fetchEvents();
    } catch (error) {
        alert("Failed to delete event");
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
          value={Eventimage}
          onChange={(e) => setEventImg(e.target.value)}
          className='form-control'
        />
        <br></br>

        <input type="text"
          placeholder='Title of Event'
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control'
        />
        <br></br>

        <input type="text"
          placeholder='description of event'
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          className='form-control'
        />
        <br></br>

        <button type="submit">
          {editId ? "Update Event" : "Add Event"}
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
                src={event.Eventimage}
                alt={event.Title}
                width="200"
              />

              <h3>{event.Title}</h3>

              <p>{event.Description}</p>

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

export default Events;