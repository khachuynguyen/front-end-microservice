import Button from 'react-bootstrap/Button';

function ButtonBootstrap(props) {
  var text = props.text;
  var type = props.type;
  var widths= props.widths;
  return (
    <div>
      <Button style={{ width:widths}} variant={type}>{text}</Button>
    </div>
  );
}

export default ButtonBootstrap;