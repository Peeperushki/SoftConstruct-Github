const CONTAINER = document.getElementById("container")

// Retrieve student data from local storage
const STUDENTS = JSON.parse(localStorage.getItem("students")) || []

console.log(STUDENTS)

if (STUDENTS.length > 0) {

    STUDENTS.forEach((student, index) => {
        let result = document.createElement("div")
        result.id = "result"

        let studentNameText = document.createElement("h1")
        studentNameText.textContent = `[${index + 1}] ${student.name}`
        result.appendChild(studentNameText)

        let studentIDText = document.createElement("p")
        studentIDText.textContent = `ID: ${student.id}`
        result.appendChild(studentIDText)

        let studentEmailText = document.createElement("p")
        studentEmailText.textContent = `Email: ${student.email}`
        result.appendChild(studentEmailText)

        let studentPhoneText = document.createElement("p")
        studentPhoneText.textContent = `Phone Number: ${student.phoneNumber}`
        result.appendChild(studentPhoneText)

        CONTAINER.appendChild(result)
    })
    
} else {
    let result = document.createElement("div")
    result.id = "result"

    let messageText = document.createElement("p")
    messageText.textContent = "No students found"
    result.appendChild(messageText)

    CONTAINER.appendChild(result)
}