// Import essentials
import { searchWith } from "../../Modules/Controllers/Course/Search/searchFunction.js"
import { displayStudentsInCourse } from "../../Modules/Controllers/Course/listStudents/listStudentsFunction.js"
import { findStudent } from "../../Modules/Controllers/Course/listStudents/listStudentsFunction.js"
import { suggestAll, updateCache } from "../../Modules/Controllers/SearchSuggestions/searchSuggest.js"

// HTML elements
const SEARCH_BAR = document.getElementById("search")

// Retrieve course data from local storage
const COURSES = JSON.parse(localStorage.getItem("courses")) || []

console.log(COURSES)

// Load search suggestions from cache
suggestAll("course-search-cache", document.getElementById("history"));
suggestAll("student-search-cache", document.getElementById("students-history"));

SEARCH_BAR.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        event.preventDefault()

        let value = SEARCH_BAR.value
        let getData = searchWith(value, "code");

        // update search cache and reload search suggestions
        updateCache("course-search-cache", value);
        suggestAll("course-search-cache", document.getElementById("history"));

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

            let courseNameText = document.createElement("h1")
            courseNameText.textContent = getData.name
            result.appendChild(courseNameText)

            let courseCodeText = document.createElement("p")
            courseCodeText.textContent = "Code: " + getData.code
            result.appendChild(courseCodeText)

            let courseCreditHourText = document.createElement("p")
            courseCreditHourText.textContent = "Credit Hour(s): " + getData.creditHour
            result.appendChild(courseCreditHourText)

            let courseMSTeamsLinkText = document.createElement("p")
            courseMSTeamsLinkText.textContent = "MS Teams Link: " + getData.msTeamsLink
            result.appendChild(courseMSTeamsLinkText)

            let courseTypeText = document.createElement("p")
            courseTypeText.textContent = `Type: ${getData.type}`
            result.appendChild(courseTypeText)

            let studentsEnrollListText = document.createElement("p")
            studentsEnrollListText.textContent = `Students enrolled`
            result.appendChild(studentsEnrollListText)

            let studentsEnrollList = document.createElement("div");
            result.appendChild(studentsEnrollList)
            
            findStudent(result, getData.code, studentsEnrollList);

            studentsEnrollList.replaceChildren();
            displayStudentsInCourse(getData.students, studentsEnrollList);
        } else {
            // Data does not exist, send error
            var result = document.createElement("p");
            result.id = "result"
            result.textContent = "Course \"" + value + "\" was not found.";
        }

        container.appendChild(result)
    }
})