// Import essentials
import { searchWith, searchIndexWith  } from "../../Modules/Controllers/Course/Search/searchFunction.js"
import { displayCoursesInStudent } from "../../Modules/Controllers/Students/listCourses/listCoursesFunction.js"
import { suggestAll, updateCache } from "../../Modules/Controllers/SearchSuggestions/searchSuggest.js"

// HTML elements
const SEARCH_BAR = document.getElementById("search")
const EDITOR = document.getElementById("editor")
const BUTTON = document.getElementById("submit");
const DETAILS = document.getElementById("details")
const CONTAINER = document.getElementById("container")

// Retrieve course data from local storage
var students = JSON.parse(localStorage.getItem("students")) || []

console.log(students)

// Load search suggestions from cache
suggestAll("student-search-cache", document.getElementById("history"));

var value;

SEARCH_BAR.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        event.preventDefault()

        value = SEARCH_BAR.value
        let getData = searchWith(value, "id", "Students");

        // update search cache and reload search suggestions
        updateCache("student-search-cache", value);
        suggestAll("student-search-cache", document.getElementById("history"));

        var result;

        // check if existing details exist
        if (document.getElementById("result")) {
            document.getElementById("result").remove()
        }

        CONTAINER.hidden = true

        if (getData != null) {
            // Create the student details
            result = document.createElement("div")
            result.id = "result"

            let studentNameText = document.createElement("h1")
            studentNameText.textContent = getData.name
            result.appendChild(studentNameText)

            let studentIDText = document.createElement("p")
            studentIDText.textContent = "ID: " + getData.id
            result.appendChild(studentIDText)

            let studentEmailText = document.createElement("p")
            studentEmailText.textContent = "Email: " + getData.email
            result.appendChild(studentEmailText)

            let studentPhoneText = document.createElement("p")
            studentPhoneText.textContent = "Phone Number: " + getData.phoneNumber
            result.appendChild(studentPhoneText)

            // Display all courses taken by the student
            displayCoursesInStudent(getData.courses, document.getElementById("courses-taken-list"), getData["id"]);

            // form
            document.getElementById("studentName").value = getData.name
            document.getElementById("studentID").value = getData.id
            document.getElementById("studentEmail").value = getData.email
            document.getElementById("phoneNumber").value = getData.phoneNumber

            CONTAINER.hidden = false
        } else {
            // Data does not exist, send error
            var result = document.createElement("p");
            result.id = "result"
            result.textContent = "Student  \"" + value + "\" was not found.";
        }

        DETAILS.appendChild(result)
    }
})

if (BUTTON != null) {
    BUTTON.addEventListener('click', function(event) {
        event.preventDefault()
        
        // Fetch data from the form
        const FORM_DATA = new FormData(EDITOR);
        const NAME = FORM_DATA.get("studentName");
        const EMAIL = FORM_DATA.get("studentEmail");
        const PHONE_NUMBER = FORM_DATA.get("phoneNumber");

        let index = searchIndexWith(value, "id", "Students")
        students[index]["name"] = NAME
        students[index]["email"] = EMAIL
        students[index]["phoneNumber"] = PHONE_NUMBER

        // Save the student data to localstorage
        localStorage.setItem("students", JSON.stringify(students))
        courses = JSON.parse(localStorage.getItem("students")) || []

        console.log(students)

        // Edit success notification
        let editedSuccess = document.createElement("p")
        editedSuccess.id = "editedSuccess"
        editedSuccess.textContent = "Successfully edited student"

        if (document.getElementById("editedSuccess")) {
            document.getElementById("editedSuccess").remove()
        }

        CONTAINER.appendChild(editedSuccess)
    })
} 