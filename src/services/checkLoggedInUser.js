import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function checkToken() {
  const navigate = useNavigate();
  if (Cookies.get('token') === undefined) {
    console.log('Here we are');
    navigate('/login', { replace: true });
  }
}
