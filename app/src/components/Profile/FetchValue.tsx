import Cookies from 'js-cookie';

export const fetchValue = (key: string, propsValue: string, setCallBack: any) => {
    async function fetchIt() {
      await fetch('http://localhost:3030/users/' + propsValue + '/' + key, {
        credentials: 'include', 
        headers: {
          'Authorization': `bearer ${Cookies.get('jwtToken')}`,
        }
      })
      .then(res => res.text())
      .then(data => setCallBack(data))
    }
    fetchIt();
  }

  export const fetchObject = (route: string, setCallBack: any) => {
    async function fetchIt() {
      await fetch('http://localhost:3030/' + route, {
        credentials: 'include', 
        headers: {
          'Authorization': `bearer ${Cookies.get('jwtToken')}`,
        }
      })
      .then(res => res.blob())
      .then(data => setCallBack(data))
    }
    fetchIt();
  }