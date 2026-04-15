import { searchWith, searchIndexWith } from "../../Modules/Controllers/Course/Search/searchFunction.js"

const SEARCH_BAR = document.getElementById("search")
const EDITOR = document.getElementById("editor")
const BUTTON = document.getElementById("submit");
const DETAILS = document.getElementById("details")
const CONTAINER = document.getElementById("container")

// Retrieve course data from local storage
var courses = JSON.parse(localStorage.getItem("courses")) || []

console.log(courses)

var value;

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

        CONTAINER.hidden = true

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

if (BUTTON != null) {
    BUTTON.addEventListener('click', function(event) {
        event.preventDefault()
        
        // Fetch data from the form
        const FORM_DATA = new FormData(EDITOR);
        const NAME = FORM_DATA.get("courseName");
        const CREDIT_HOUR = FORM_DATA.get("creditHour");
        const MS_TEAMS_LINK = FORM_DATA.get("msTeamsLink");

        let index = searchIndexWith(value, "code")
        courses[index]["name"] = NAME
        courses[index]["creditHour"] = CREDIT_HOUR
        courses[index]["msTeamsLink"] = MS_TEAMS_LINK

        // Save the course data to localstorage
        localStorage.setItem("courses", JSON.stringify(courses))
        courses = JSON.parse(localStorage.getItem("courses")) || []

        console.log(courses)

        // Edit success notification
        let editedSuccess = document.createElement("p")
        editedSuccess.id = "editedSuccess"
        editedSuccess.textContent = "Successfully edited course"

        if (document.getElementById("editedSuccess")) {
            document.getElementById("editedSuccess").remove()
        }

        CONTAINER.appendChild(editedSuccess)
    })
} 