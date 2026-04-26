import { Course } from '../../Classes/ClassCourse'

// Retrieve course data from local storage
const COURSES = JSON.parse(localStorage.getItem("courses")) || [];

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

        // Create the new course
        var NewCourse = new Course(NAME, CODE, CREDIT_HOUR, null, MS_TEAMS_LINK);
        COURSES.push(NewCourse);

        // Save the course data to localstorage
        localStorage.setItem("courses", JSON.stringify(COURSES))

        CONTAINER.innerHTML = "Successfully added course."

        console.log(COURSES)
    })
} 