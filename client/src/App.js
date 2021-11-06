import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notifysuccess = () => toast.success('Password added!', {
    theme: "colored",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  
  const notifyfailure = () => toast.error('Input fields cannot be empty!', {
    theme: "colored",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')
  const [passwordList, setPasswordList] = useState([])
  // const prodURL = 'https://pass-manager-backend.herokuapp.com'
  const devURL = 'http://localhost:3001'

  useEffect(() => {
    Axios.get(`${devURL}/showpasswords`).then((response) => {
      console.log(response.data)
      setPasswordList(response.data)
    })
  }, []) //[] => only calls when page refreshes


  const addPassword = () => {
    if (password === '' || website === '') {
      notifyfailure()
    }
    else {
      Axios.post(`${devURL}/addpass`, {
        password: password, 
        website: website
      })
      console.log('clearing website input field')
      setWebsite('')
      console.log('clearing password input field')
      setPassword('')
      notifysuccess()
    }
  }

  const decryptPassword = (encryption) => {
    Axios.post(`${devURL}/decryptpassword`, {
      password: encryption.password,
      iv: encryption.iv,
      decryptState: false
    }).then((response) => {
      console.log(response.data)
      setPasswordList(passwordList.map((val) => {
        return (val.id === encryption.id) ? {id: val.id, 
          password: val.id, 
          website: response.data, 
          iv: val.iv, 
          decryptState: true 
        } : val 
      }))
    })
  }

  return (
  <div className="App">
    <div className="AddPass">
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
	<div className="w-full max-w-xl mx-auto pt-8 pb-8 px-4 font-sans">
		<form className="bg-white shadow-md rounded-lg px-6 pt-6 pb-8">
			<h3 className="title text-xl mb-8 mx-auto text-center font-bold text-indigo-600">Password Manager</h3>
			<div className="mb-4">

      <label className="font-bold block mb-1 mt-6 text-gray-700" for="website">
        Website
      </label>
				<input type="text" placeholder="facebook.com" className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono" 
        onChange={(event) => {
          setWebsite(event.target.value)
        }}
        />
      <div className="mb-4 mt-4">
      <label className="font-bold block mb-1 mt-6 text-gray-700" for="password">
        Password
      </label>
      <input type="password" className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono" id="password"
      onChange={(event) => {
        setPassword(event.target.value)
      }}
      />
      </div>

      <div className="w-full items-center">
					<button onClick={ () => { addPassword(); }} className="mb-6 shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-4" type="button">
						Add password 
					</button>

        <div className="passwords items-center flex-wrap justify-center items-baseline">
          {passwordList.map((val) => {
            console.log(val)
            return <div className="w-full mt-3 rounded-lg px-4 py-2 bg-black text-white cursor-pointer hover:bg-yellow-400 hover:text-black" key={val.id} 
            onMouseOut={() => {
              Axios.get(`${devURL}/showpasswords`).then((response) => {
              console.log(response.data)
              setPasswordList(response.data)
            })}} 
            onMouseOver={() => { 
              console.log("Decrypting...")
              decryptPassword({ password: val.password, iv: val.iv, id: val.id })
            }}> {val.website} </div>
          })}
          </div>
			    </div>
        </div>
      </form> 
	  </div>
  </div>
</div>
  );
}

export default App;
