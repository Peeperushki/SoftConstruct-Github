// Import essentials
import { searchWith, searchIndexWith } from "../../Modules/Controllers/Course/Search/searchFunction.js"
import { displayStudentsInCourse } from "../../Modules/Controllers/Course/listStudents/listStudentsFunction.js"
import { Course } from "../../Classes/ClassCourse.js"
import { suggestAll, updateCache } from "../../Modules/Controllers/SearchSuggestions/searchSuggest.js"

// HTML elements
const SEARCH_BAR = document.getElementById("search")
const EDITOR = document.getElementById("editor")
const BUTTON = document.getElementById("submit");
const ADD_STUDENT_BTN = document.getElementById("add-student-btn")
const DETAILS = document.getElementById("details")
const CONTAINER = document.getElementById("container")

const COURSE_NAME = document.getElementById("courseName");
const CREDIT_HOUR = document.getElementById("creditHour");
const COURSE_MS_TEAMS_LINK = document.getElementById("msTeamsLink");
const COURSE_TYPE = document.getElementById("course-type");

// Retrieve course data from local storage
var courses = JSON.parse(localStorage.getItem("courses")) || []
var getCourseIndex;

console.log(courses)

// Load search suggestions from cache
suggestAll("course-search-cache", document.getElementById("history"));

var value;

SEARCH_BAR.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        event.preventDefault()

        value = SEARCH_BAR.value
        let getData = searchWith(value, "code");

        // update search cache and reload search suggestions
        updateCache("course-search-cache", value);
        suggestAll("course-search-cache", document.getElementById("history"));

        var result;

        // check if existing details exist
        if (document.getElementById("result")) {
            document.getElementById("result").remove()
        }

        CONTAINER.hidden = true

        if (getData != null) {
            // Create the course details
            result = document.createElement("div")
            result.id = "result"

            COURSE_NAME.value = getData["name"];
            CREDIT_HOUR.value = getData["creditHour"];
            COURSE_MS_TEAMS_LINK.value = getData["msTeamsLink"];
            COURSE_TYPE.value = getData["type"];
            // console.log(COURSE_TYPE.value);

            displayStudentsInCourse(getData.students, document.getElementById("students-enroll-list"), getData["code"]);

            CONTAINER.hidden = false
        } else {
            // Data does not exist, send error
            var result = document.createElement("p");
            result.id = "result"
            result.textContent = "Course \"" + value + "\" was not found.";
        }

        DETAILS.appendChild(result)
    }
})

BUTTON.addEventListener('click', function (event) {
    event.preventDefault()

    // Fetch data from the form
    const FORM_DATA = new FormData(EDITOR);
    const NAME = FORM_DATA.get("courseName");
    const CREDIT_HOUR = FORM_DATA.get("creditHour");
    const MS_TEAMS_LINK = FORM_DATA.get("msTeamsLink");
    const TYPE = FORM_DATA.get("course-type");

    let index = searchIndexWith(value, "code");
    getCourseIndex = index;
    courses[index]["name"] = NAME
    courses[index]["creditHour"] = CREDIT_HOUR
    courses[index]["msTeamsLink"] = MS_TEAMS_LINK
    courses[index]["type"] = TYPE

    // Save the course data to localstorage
    localStorage.setItem("courses", JSON.stringify(courses))
    courses = JSON.parse(localStorage.getItem("courses")) || []

    // Edit success notification
    let editedSuccess = document.createElement("p")
    editedSuccess.id = "editedSuccess"
    editedSuccess.textContent = "Successfully edited course"

    if (document.getElementById("editedSuccess")) {
        document.getElementById("editedSuccess").remove()
    }

    CONTAINER.appendChild(editedSuccess)
})

ADD_STUDENT_BTN.addEventListener("click", function(event) {
    event.preventDefault();

    const STUDENT_ID = document.getElementById("add-student-input");
    const SUCCESS_MSG = document.getElementById("add-student-success-msg")

    updateCache("student-search-cache", STUDENT_ID.value);
    suggestAll("student-search-cache", document.getElementById("students-history"));

    let students = JSON.parse(localStorage.getItem("students")) || []
    courses = JSON.parse(localStorage.getItem("courses")) || []

    // See if the input is not empty
    if (STUDENT_ID.value.length>0 && STUDENT_ID.value != "") {
        // Create a temporary object holding the attributes
        let courseClass = new Course();
        let courseIndex = searchIndexWith(value, "code");
        Object.assign(courseClass, courses[courseIndex]);

        // Search for the student
        let index = searchIndexWith(STUDENT_ID.value, "id", "Students");

        // Add the student into the course
        let result = courseClass.addStudent(index, courseIndex);

        SUCCESS_MSG.textContent = result;

        // Update data and display
        courses = JSON.parse(localStorage.getItem("courses")) || []
        displayList(courses[courseIndex].students, document.getElementById("students-enroll-list"), courses[courseIndex]["code"]);
    }
})