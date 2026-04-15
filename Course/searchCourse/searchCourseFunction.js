import { searchWith } from "../../Modules/Controllers/Course/Search/searchFunction.js"

const SEARCH_BAR = document.getElementById("search")

// Retrieve course data from local storage
const COURSES = JSON.parse(localStorage.getItem("courses")) || []

console.log(COURSES)

SEARCH_BAR.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        event.preventDefault()

        let value = SEARCH_BAR.value
        let getData = searchWith(value, "code");

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
        } else {
            // Data does not exist, send error
            var result = document.createElement("p");
            result.id = "result"
            result.textContent = "Course \"" + value + "\" was not found.";
        }

        container.appendChild(result)
    }
})