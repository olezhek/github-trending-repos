import PropTypes from 'prop-types'

const Alert = ({ message }) => (
  <div className="alert alert-warning show" role="alert">
    {message}
  </div>
)

Alert.propTypes = { message: PropTypes.string.isRequired }

export default Alert
