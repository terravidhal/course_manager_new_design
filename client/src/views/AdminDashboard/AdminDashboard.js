import React, {useState, useEffect} from 'react';
import './AdminDashboard.css';
import CourseTable from '../../components/CourseTable/CourseTable';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import StudentTable from '../../components/StudentTable/StudentTable';
import InstructorTable from '../../components/InstructorTable/InstructorTable';




const AdminDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const [display, setDisplay] = useState("courses");
  const navigate = useNavigate();

 
  const userObjs = JSON.parse(localStorage.getItem('USER_OBJ')) || {};
  const userObjsRole = userObjs.role || 'default';
  const userObjsId = userObjs._id || 'default';
  
  console.log("userObjRole+++++++++", userObjsRole);
  console.log("userObjsId+++++++++", userObjsId);


  // check and update courses status5
  useEffect(() => {
    const GetAllCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses", { withCredentials: true });
        const courses = response.data.allDaCourses;
       // console.log('response', response);
        
        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses); 

        setAllCourses(updatedCourses);
      } catch (err) {
        console.error(err);
      }
    };

    GetAllCourses();
  }, []); 

  //update courses
  const updateCourseStatuses = (courses) => {
    return courses.map((course) => {
      const currentDate = new Date().getDate(); // Get current day of the week
      const courseDate = new Date(course.dayOfWeek).getDate(); // Get day of the week from course
  
      const date = new Date();
      const hours = date.getHours(); // 11
      const minutes = date.getMinutes(); // 1
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const currentTime = new Date(
        0,
        0,
        0,
        parseInt(formattedTime.split(":")[0]),
        parseInt(formattedTime.split(":")[1])
      );
  
      const startTIME = new Date(
        0,
        0,
        0,
        parseInt(course.startTime.split(":")[0]),
        parseInt(course.startTime.split(":")[1])
      );
      const endTIME = new Date(
        0,
        0,
        0,
        parseInt(course.endTime.split(":")[0]),
        parseInt(course.endTime.split(":")[1])
      );

     // console.log('currentDate > courseDate // currentTime > endTIME',currentDate > courseDate,currentTime > endTIME);
     // console.log('currentTime , endTIME',currentTime , endTIME);

      // Update status if current date is past the course's day and current time is past the course's end time
      if (currentDate > courseDate ) {
        course.status = "resolved";
      } else if (currentDate === courseDate && currentTime > endTIME) {
        course.status = "resolved";
      } else {
         console.log('pending');
      }
      return course;
    });
  };

  

  // get all students
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students",{withCredentials: true})
      .then((res) => {
        setAllStudents(res.data);
        console.log('r+++++++', res.data)
      })
      .catch((err) => console.log(err));
  }, []); 

  // get all instructors
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instructors",{withCredentials: true})
      .then((res) => {
        setAllInstructors(res.data);
        console.log('r+++++++', res.data)
      })
      .catch((err) => console.log(err));
  }, []); 



  // delete One specific course
  const deleteCourse = (courseId) => {
    axios
      .delete("http://localhost:8000/api/courses/" + courseId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllCourses(allCourses.filter(course=> course._id !== courseId)); 
      })
      .catch((err) => console.log(err));
  };

  // delete One specific student
  const deleteStudent = (studentId) => {
    axios
      .delete("http://localhost:8000/api/students/" + studentId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllStudents(allStudents.filter(student=> student._id !== studentId)); 
      })
      .catch((err) => console.log(err));
  };

  // delete One specific instructor
  const deleteInstructor = (instructorId) => {
    axios
      .delete("http://localhost:8000/api/instructors/" + instructorId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllInstructors(allInstructors.filter(instructor=> instructor._id !== instructorId)); 
      })
      .catch((err) => console.log(err));
  };


  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      if ( userObjsRole === 'student') {
          
        console.log("deconnexion",res.data.message);
        localStorage.removeItem('USER_OBJ');
         navigate("/login_page");
         
      }else if (userObjsRole === 'instructor') {
          
          console.log("deconnexion",res.data.message);
          localStorage.removeItem('USER_OBJ');
           navigate("/login_page");
      }else if (userObjsRole === 'admin') {
          
          console.log("deconnexion",res.data.message);
          localStorage.removeItem('USER_OBJ');
           navigate("/route/log/loaded25");

      } else{
        console.error("Unexpected response:", res.data);
       
      }   
    })
    .catch((err)=>{
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};



// Menu Toggle
let toggle = document.querySelector(".toggle") || {};
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};


   // add hovered class to selected list item
   let list = document.querySelectorAll(".navigation li");

   function activeLink() {
     list.forEach((item) => {
       item.classList.remove("terra");
     });
      this.classList.add("terra");
      navigation.classList.remove("active");
      main.classList.remove("active");
       if (this.classList.contains('ins')) {
        setDisplay("instructors");
       }
       else if(this.classList.contains('stud')){
        setDisplay("students")
       }
       else if(this.classList.contains('crs')){
        setDisplay("courses")
       }
       else{
        console.log("end");
       }
   }
   
   list.forEach((item) => item.addEventListener("click", activeLink));


  
  return (
    <div className="AdminDashboard">
          <div class="container">
        <div class="navigation">
            <ul>
                <li>
                    <a href="#">
                        <span class="icon">
                        <ion-icon name="logo-ionitron"></ion-icon>
                        </span>
                        <span class="title orange-color">Course<ion-icon name="logo-react"></ion-icon>Compass</span>
                    </a>
                </li>
                <li className="crs">
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Courses</span>
                    </a>
                </li>
                <li className="ins">
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Instructors</span>
                    </a>
                </li>
                <li className="stud">
                    <a href="#">
                        <span class="icon">
                        <ion-icon name="people-circle-outline"></ion-icon>
                        </span>
                        <span class="title">Manage Students</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span class="title" onClick={logout}>Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
                <div class="user">
                    <img src="/assets/images/utilisateur.png" alt=""/>
                </div>
            </div>
            <div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">{allCourses.length}</div>
                        <div class="cardName">Courses</div>
                    </div>
                    <div class="iconBx">
                        <ion-icon name="book-outline"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers">{allInstructors.length}</div>
                        <div class="cardName">Instructors</div>
                    </div>
                    <div class="iconBx">
                        <ion-icon name="school-outline"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers">{allStudents.length}</div>
                        <div class="cardName">Students</div>
                    </div>

                    <div class="iconBx">
                        <ion-icon name="people-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="details">
                <div class="recentOrders">
                    <div class="cardHeader">
                        { display === 'courses' ?
                            <>
                            <h2>Recent Courses</h2> 
                            <Link className='blue-color'  to="/courses/new">
                               +Add
                            </Link>
                            </>
                            : 
                          display === 'students' ?  
                            <>
                              <h2>Recent Students</h2> 
                              <Link class="blue-color" to="/students/new">
                                 +Add
                              </Link>
                            </>
                            :
                          display === 'instructors' ?
                             <>
                              <h2>Recent Instructors</h2> 
                              <Link class="blue-color" to="/instructors/new">
                                 +Add
                              </Link>
                             </>
                             : null
                        }
                    </div>
                    {
                      display === 'courses' ?
                      <CourseTable allCourses={allCourses} deleteCourse={deleteCourse} />: null
                    }
                    {
                      display === 'students' ?
                      <StudentTable allStudents={allStudents} deleteStudent={deleteStudent} />: null
                    }
                    {
                      display === 'instructors' ?
                      <InstructorTable allInstructors={allInstructors} deleteInstructor={deleteInstructor} />: null
                    }
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};


export default AdminDashboard;