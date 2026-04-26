// Import essentials
import { searchWith, searchIndexWith } from "../../Modules/Controllers/Course/Search/searchFunction.js"
import { suggestAll, updateCache } from "../../Modules/Controllers/SearchSuggestions/searchSuggest.js"

// HTML elements
const SEARCH_BAR = document.getElementById("search")
const DETAILS = document.getElementById("details")
const CONTAINER = document.getElementById("container")

// Retrieve course data from local storage
var courses = JSON.parse(localStorage.getItem("courses")) || []

console.log(courses)

// Load search suggestions from cache
suggestAll("course-search-cache", document.getElementById("history"));

var value;
var buttonAccept;

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

            // Ask user if they want to delete the course
            CONTAINER.innerHTML = "<br>Would you like to delete this course?"

            buttonAccept = document.createElement("input")
            buttonAccept.type = "button"
            buttonAccept.value = "Yes"
            CONTAINER.appendChild(buttonAccept)

            buttonAccept.addEventListener('click', function (event) {
                if (document.getElementById("result")) {
                    document.getElementById("result").remove()
                }

                let index = searchIndexWith(value, "code");

                if (index !== null) {

                    // Delete the same course taken by every student
                    let students = JSON.parse(localStorage.getItem("students")) || []

                    students.forEach((student, _) => {
                        if (student["courses"]) {
                            student.courses.forEach((course, i) => {
                                if (course.code === value) {
                                    student.courses.splice(i, 1);
                                }
                            });
                        }
                    })

                    localStorage.setItem("students", JSON.stringify(students));

                    courses.splice(index, 1);
                    console.log(courses)

                    // Save the course data to localstorage
                    localStorage.setItem("courses", JSON.stringify(courses))

                    CONTAINER.innerHTML = "Successfully removed course."
                    buttonAccept.remove();
                }

            })
        } else {
            // Data does not exist, send error
            var result = document.createElement("p");
            result.id = "result"
            result.textContent = "Course \"" + value + "\" was not found.";
        }

        DETAILS.appendChild(result)
    }
})