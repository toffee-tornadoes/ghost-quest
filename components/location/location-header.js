const LocationHeader = ({ location }) => {
  return (
    <div>
      picture here
      <h1>{location.location}</h1>
      <h1>{location.city}{", "}{location.state}</h1>
      <p>{location.description}</p>
    </div>
  )
}

export default LocationHeader;
