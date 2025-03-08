import React from 'react'
import "@fortawesome/fontawesome-free/css/all.css";
import Logo from './components/logo/logo';
import Grid from './components/members/Grid';


function App() {
  return (
<div className="min-h-screen h-auto w-full bg-black text-white">
<Logo/>
  <h1 className='md:text-4xl text-3xl text-center pt-4'>List of Members</h1>
  <Grid/>



</div>  )
}
export default App;