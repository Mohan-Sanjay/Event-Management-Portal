// src/components/EventCard.js
const EventCard = ({ event, onApprove, onReject }) => {
    return (
      <div className="event-card">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>Time: {event.eventTime}</p>
        <p>Status: {event.status || 'Pending'}</p>
        {onApprove && onReject && (
          <div>
            <button onClick={() => onApprove(event._id, 'approved')}>Approve</button>
            <button onClick={() => onReject(event._id, 'rejected')}>Reject</button>
          </div>
        )}
      </div>
    );
  };
  
  export default EventCard;
  