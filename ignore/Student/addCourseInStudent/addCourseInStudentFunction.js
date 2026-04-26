import { searchWith, searchIndexWith } from "../../Modules/Controllers/Course/Search/searchFunction.js"

const SEARCH_BAR = document.getElementById("search")
const DETAILS = document.getElementById("details")
const CONTAINER = document.getElementById("container")

// Retrieve course data from local storage
var courses = JSON.parse(localStorage.getItem("courses")) || []

console.log(courses)

var value;
var buttonAccept;

SEARCH_BAR.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        event.preventDefault()

        value = SEARCH_BAR.value
        let getData = searchWith(value, "code");

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
            CONTAINER.innerHTML = "<br>Would you like to add this course to this student?"

            buttonAccept = document.createElement("input")
            buttonAccept.type = "button"
            buttonAccept.value = "Yes"
            CONTAINER.appendChild(buttonAccept)

            buttonAccept.addEventListener('click', function (event) {
                if (document.getElementById("result")) {
                    document.getElementById("result").remove()
                }

                let index = searchIndexWith(value, "code");
                courses.splice(index, 1);
                console.log(courses)

                // Save the course data to localstorage
                localStorage.setItem("courses", JSON.stringify(courses))

                CONTAINER.innerHTML = "Successfully removed course."
                buttonAccept.remove();

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