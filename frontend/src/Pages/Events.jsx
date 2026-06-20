import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
const Events = () => {
  const [Eventimage, setEventImg] = useState("");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  async function fetchEvents() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events"
      );
      setEvents(response.data);
    } catch (error) {
      alert("No data found");
      console.error(error);
    }
  }

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
          `http://localhost:5000/api/events/${editId}`,
          eventData
        );

        alert(response.data.message);
        setEditId(null);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/events",
          eventData
        );

        alert(response.data.message);
      }

      setEventImg("");
      setTitle("");
      setDescription("");

      fetchEvents();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setEventImg(event.Eventimage);
    setTitle(event.Title);
    setDescription(event.Description);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/events/${id}`
      );

      alert(response.data.message);
      fetchEvents();
    } catch (error) {
      alert("Failed to delete event");
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEventImg("");
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <div className="events-banner">
        <h2>Events</h2>
      </div>

      <form onSubmit={handleevent}>
        <input
          type="text"
          placeholder="Image URL"
          value={Eventimage}
          onChange={(e) => setEventImg(e.target.value)}
          className="form-control"
        />
        <br />

        <input
          type="text"
          placeholder="Title of Event"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
        <br />

        <input
          type="text"
          placeholder="Description of Event"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
        <br />

        <button type="submit">
          {editId ? "Update Event" : "Add Event"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={cancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <hr />

      <h2>Event List</h2>

      {events.length === 0 ? (
        <p>No Events Found</p>
      ) : (
        <div className="events-container">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;