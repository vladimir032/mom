export default function Message({ name, message }) {
    return (
      <p className="message">
        {name ? `${message}, ${name}!` : message}
      </p>
    );
  }
  