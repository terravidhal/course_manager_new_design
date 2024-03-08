import React from 'react';
import './HomeHome.css';
import { Link } from "react-router-dom";


const HomeHome = () => (
 
  <div className="HomeHome" style={{
    backgroundImage: 'url("/assets/images/bg_1.jpg.webp")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100vh',
    position: 'relative',
  }}>
  <div class="header top-1">
         <div class="title">
           <div class="title-1">
               COURSES COMPASS
           </div>
           <div class="title-2">
              System Management Of Courses
           </div>
         </div>
         <div class="social-icons">
             <div class=" social facebook">
              <i class="fa-brands fa-facebook-f"></i>
             </div>
           <div class="social twitter">
              <i class="fa-brands fa-twitter"></i>
           </div>
           <div class="social instagram">
              <i class="fa-brands fa-instagram"></i>
           </div>
           <div class="social driblle">
              <i class="fa-brands fa-dribbble"></i>
           </div>
         </div>
      </div>
      <div class="header top-2">
        <ul>
          <li class="active">Home</li>
          <li>About</li>
          <li>Team</li>
          <li>Contact</li>
        </ul>
      </div>
      <div class="card-1">
          <div class="title-card">
              WELCOME TO COURSES COMPASS
          </div>
          <div class="message-card1">
              Best Online Courses Management 
          </div>
          <div class="message-card2">
          Explore our platform to access the best course management tools. Learn, grow, and excel with our courses. 
          </div>
          <div class="buttons">
              <button class="primary">
              <Link className="btt violet"  to={"/register_instructor"}>
                       GET STARTED NOW! 
              </Link>
                </button>
          </div>
      </div>
</div>

  // return(
  // <div className="HomeHome">
  //   <div class="header top-1">
  //          <div class="title">
  //            <div class="title-1">
  //                ACADEMIA
  //            </div>
  //            <div class="title-2">
  //               Online Education & Learning
  //            </div>
  //          </div>
  //          <div class="social-icons">
  //              <div class=" social facebook">
  //               <i class="fa-brands fa-facebook-f"></i>
  //              </div>
  //            <div class="social twitter">
  //               <i class="fa-brands fa-twitter"></i>
  //            </div>
  //            <div class="social instagram">
  //               <i class="fa-brands fa-instagram"></i>
  //            </div>
  //            <div class="social driblle">
  //               <i class="fa-brands fa-dribbble"></i>
  //            </div>
  //          </div>
  //       </div>
  //       <div class="header top-2">
  //         <ul>
  //           <li class="active">Home</li>
  //           <li>Allcourses</li>
  //           <li>About</li>
  //           <li>Team</li>
  //           <li>Contact</li>
  //         </ul>
  //       </div>
  //       <div class="card-1">
  //           <div class="title-card">
  //               WELCOME TO ACADEMIA
  //           </div>
  //           <div class="message-card1">
  //               Best Online Education Expertise 
  //           </div>
  //           <div class="message-card2">
  //               Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. 
  //           </div>
  //           <div class="buttons">
  //               <button class="primary">GET STARTED NOW! </button>
  //           </div>
  //       </div>
  // </div>
  // );
);



export default HomeHome;
