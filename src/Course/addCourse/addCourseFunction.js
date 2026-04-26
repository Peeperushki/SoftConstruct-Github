// Import essentials
import { Course } from '../../Classes/ClassCourse.js'

// Retrieve course data from local storage
const COURSES = JSON.parse(localStorage.getItem("courses")) || [];

// HTML elements
const FORM = document.getElementById("form");
const BUTTON = document.getElementById("submit");
const CONTAINER = document.getElementById("container");

if (BUTTON != null) {
    BUTTON.addEventListener('click', function(event) {
        event.preventDefault()
        
        // Fetch data from the form
        const FORM_DATA = new FormData(FORM);
        const NAME = FORM_DATA.get("courseName");
        const CODE = FORM_DATA.get("courseCode");
        const CREDIT_HOUR = FORM_DATA.get("creditHour");
        const MS_TEAMS_LINK = FORM_DATA.get("msTeamsLink");
        const TYPE = FORM_DATA.get("course-type");

        // Create the new course
        var NewCourse = new Course(NAME, CODE, CREDIT_HOUR, null, MS_TEAMS_LINK, TYPE);

        // Check if a course is already holding the same course code
        let isExist = false;
        COURSES.forEach((x, i) => {
            if (x.code == CODE) {
                isExist = true;
                CONTAINER.innerHTML = `Course with the course code "${x.code}" already exists`
                // break;
            }
        });

        if (!isExist) {
            COURSES.push(NewCourse);
    
            // Save the course data to localstorage
            localStorage.setItem("courses", JSON.stringify(COURSES))
    
            CONTAINER.innerHTML = "Successfully added course."
    
            console.log(COURSES)
        }

    })
} 