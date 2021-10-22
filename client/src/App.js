import './App.css';
import { useState } from 'react'
import Axios from 'axios'

function App() {

  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')

  const addPassword = () => {
    Axios.post('http://localhost:3001/addpass', {
      password: password, 
      website: website
    })
  }
  return (
    <div className="App">
        <div className="AddPass">
        {/* <body className="bg-purple-200"> */}
	<div className="w-full max-w-xs mx-auto mt-8 px-4 font-sans">
		<form className="bg-white shadow-md rounded-lg px-6 pt-6 pb-8 mb-4">
			<h3 className="title text-xl mb-8 mx-auto text-center font-bold text-purple-700">Add a new password</h3>
			<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="website">
        Website
      </label>
				<input type="text" placeholder="Ex. abc.com" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
        onChange={(event) => {
          setWebsite(event.target.value)
        }}
        />

        <div className="mb-4 mt-4">

        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
        <input type="password" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 pt-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" placeholder="***************" 
        onChange={(event) => {
          setPassword(event.target.value)
        }}
        />

        </div>

        <div className="w-full items-center">
					<button onClick={addPassword} className="shadow bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-4" type="button">
						Add password 
					</button>
        </div>

				{/* <div className="flex items-center justify-between">
					<button className="shadow bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-4" type="button">
						Sign Up
					</button>
					<a className="inline-block -mb-4 align-baseline font-bold text-sm text-purple-500 hover:text-purple-600 focus:shadow-outline focus:outline-none" href="#">
          Forgot Password?
					</a>
				</div> */}
			</div>
		</form>
	</div>
{/* </body> */}
        </div>
    </div>
  );
}

export default App;
