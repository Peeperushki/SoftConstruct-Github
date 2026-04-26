import { searchWith, searchIndexWith  } from "../../Modules/Controllers/Course/Search/searchFunction.js"

const SEARCH_BAR = document.getElementById("search")
const DETAILS = document.getElementById("details")
const CONTAINER = document.getElementById("container")

// Retrieve course data from local storage
var students = JSON.parse(localStorage.getItem("students")) || []
console.log(students)

var value;
var buttonAccept;

SEARCH_BAR.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        event.preventDefault()

        value = SEARCH_BAR.value
        let getData = searchWith(value, "id", "Students");

        var result;

        // check if existing details exist
        if (document.getElementById("result")) {
            document.getElementById("result").remove()
        }

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

            // Ask user if they want to delete the student
            CONTAINER.innerHTML = "<br>Would you like to delete this student?"

            buttonAccept = document.createElement("input")
            buttonAccept.type = "button"
            buttonAccept.value = "Yes"
            CONTAINER.appendChild(buttonAccept)

            buttonAccept.addEventListener('click', function (event) {
                if (document.getElementById("result")) {
                    document.getElementById("result").remove()
                }

                let index = searchIndexWith(value, "id", "Students");
                
                if (index !== null) {
                    students.splice(index, 1);
                    console.log("Students after deletion:", students)

                // Save the course data to localstorage
                localStorage.setItem("students", JSON.stringify(students))

                CONTAINER.innerHTML = "Successfully removed student."
                buttonAccept.remove();
                }

            })
        } else {
            // Data does not exist, send error
            var result = document.createElement("p");
            result.id = "result"
            result.textContent = "Student  \"" + value + "\" was not found.";
        }

        DETAILS.appendChild(result)
    }
})