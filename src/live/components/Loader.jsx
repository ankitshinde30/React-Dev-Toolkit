export default function Loader({ label = 'Loading', fullscreen = false }) {
  return (
    <div className={'loader' + (fullscreen ? ' loader--fullscreen' : '')} role="status">
      <div className="spinner" aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
