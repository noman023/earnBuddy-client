import Countdown from "react-countdown";

// Renderer function for the countdown
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Task expired</span>;
  } else {
    // Render the countdown
    return (
      <span>
        {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  }
};

const TaskCountdown = ({ completionDate }) => {
  const countdownDate = new Date(completionDate).getTime();

  return <Countdown date={countdownDate} renderer={renderer} />;
};

export default TaskCountdown;
