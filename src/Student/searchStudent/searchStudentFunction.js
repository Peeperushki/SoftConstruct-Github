// Import essentials
import { searchWith  } from "../../Modules/Controllers/Course/Search/searchFunction.js"
import { displayCoursesInStudent, findCourse } from "../../Modules/Controllers/Students/listCourses/listCoursesFunction.js"
import { suggestAll, updateCache } from "../../Modules/Controllers/SearchSuggestions/searchSuggest.js"

// HTML elements
const SEARCH_BAR = document.getElementById("search")

// Retrieve course data from local storage
const STUDENTS = JSON.parse(localStorage.getItem("students")) || []

console.log(STUDENTS)

// Load search suggestions from cache
suggestAll("student-search-cache", document.getElementById("history"));

SEARCH_BAR.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        event.preventDefault()

        let value = SEARCH_BAR.value
        let getData = searchWith(value, "id", "Students");

        // update search cache and reload search suggestions
        updateCache("student-search-cache", value);
        suggestAll("student-search-cache", document.getElementById("history"));

        var container = document.getElementById("container")
        var result;

        // check if existing details exist
        if (document.getElementById("result")) {
            document.getElementById("result").remove()
        }

        // Checks if data exists
        if (getData != null) {
            // Create the course details
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

            let coursesTakenListText = document.createElement("p")
            coursesTakenListText.textContent = `Courses taken`
            result.appendChild(coursesTakenListText)

            let coursesTakenList = document.createElement("div");
            result.appendChild(coursesTakenList)
            
            findCourse(result, getData.id, coursesTakenList);

            coursesTakenList.replaceChildren();
            displayCoursesInStudent(getData.courses, coursesTakenList);
        } else {
            // Data does not exist, send error
            var result = document.createElement("p");
            result.id = "result"
            result.textContent = "Student \"" + value + "\" was not found.";
        }

        container.appendChild(result)
    }
})