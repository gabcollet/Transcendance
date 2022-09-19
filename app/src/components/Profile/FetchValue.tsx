import Cookies from 'js-cookie';


// route: The Nest route for the path
// setCallBack: the React useState function that will change the element calling this 
export const fetchText = (route: string, setCallBack: any) => {
    async function fetchIt() {
      await fetch('http://localhost:3030/' + route, {
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