import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './UpdatePageInsructor.css';


const UpdatePageInsructor = (props)=>{
    const { id } = useParams();
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false); 
    const [user, setUser] = useState({
      name: "",
      email: "",
      isInstructor: "false",
      password: "",
      confirmPassword:""
    })
  
    const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]: e.target.value 
      })
    }

    //get  data one specific instructor
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instructors/" + id,{withCredentials: true})
      .then((res) => {
        console.log("u++++++++++",res.data.oneSingleInstructor);
        setUser({
          name: res.data.oneSingleInstructor.name,
          email: res.data.oneSingleInstructor.email,
          isInstructor: res.data.oneSingleInstructor.isInstructor,
          password: "default",
          confirmPassword: "default"
        });
        setLoaded(true); 
      })
      .catch((err) => console.log(err));
      
    }, [id]); 


    const updateInstructor = (e) =>{
      e.preventDefault();
      axios.patch('http://localhost:8000/api/instructors/'+ id,
      user,
      {
        withCredentials: true,
      })
      .then(res =>{
        console.log(res.data);
        setUser({
          name:"",
          email:"",
          isInstructor:"false",
          password:"",
          confirmPassword:""
        })
        setConfirmReg("Thank you for registering, you can now log in");
        setErrs({});
        navigate("/admin-dashboard");
      })
      .catch((err)=>{
      //  console.log(err);
        setErrs(err.response.data.errors.errors);
        console.log("+++++++++",err.response.data.errors.errors);
      })
  };

  
   
  return(
    <div className="UpdatePageInsructor">
       <div className="page-top">
        <h2>update instuctor</h2>
        <Link to="/admin-dashboard">
        <ion-icon name="arrow-back-circle-outline"></ion-icon>back to Home
        </Link>
      </div>
      {
        confirmReg?
        <h1 style={{color: "grey"}}>{confirmReg}</h1>
        :null
      }
      {loaded === true ? 
      <form onSubmit={updateInstructor}>
        <div className="field">
          <label>name</label>
          {
            errs.name?
            <span className="error-text">{errs.name.message}</span>
            :null
          }
          <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)}/>
        </div>
        <div className="field">
          <label>Email</label>
          {
            errs.email?
            <span className="error-text">{errs.email.message}</span>
            :null
          }
          <input type="email" name="email" value={user.email} onChange={(e)=> handleChange(e)}/>
        </div>
        <div className="field">
          <label>isInstructor</label>
          {
            errs.isInstructor?
            <span className="error-text">{errs.isInstructor.message}</span>
            :null
          }
          <select name="isInstructor" id="" value={user.isInstructor} onChange = {(e)=>handleChange(e)}>
               <option value="false">false</option>
               <option value="true">true</option>
          </select>
        </div>
        <div className="field">
          <label>Password</label>
          {
            errs.password?
            <span className="error-text">{errs.password.message}</span>
            :null
          }
          <input type="text" name="password" value={user.password} onChange={(e)=> handleChange(e)}/>
        </div>
        <div className="field">
          <label>Confirm Password</label>
          {
            errs.confirmPassword?
            <span className="error-text">{errs.confirmPassword.message}</span>
            :null
          }
          <input type="text" name="confirmPassword" value={user.confirmPassword} onChange={(e)=> handleChange(e)}/>
        </div>
        <button type="submit">Update</button>
      </form>  : null }
    </div>
  );
  };
  
  export default UpdatePageInsructor;

