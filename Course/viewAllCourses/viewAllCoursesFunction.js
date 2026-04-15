const SEARCH_BAR = document.getElementById("search")
const CONTAINER = document.getElementById("container")

// Retrieve course data from local storage
const COURSES = JSON.parse(localStorage.getItem("courses")) || []

console.log(COURSES)

if (COURSES.length > 0) {

    COURSES.forEach((x, i) => {
        let result = document.createElement("div")
        result.id = "result"

        let courseNameText = document.createElement("h1")
        courseNameText.textContent = `[${i+1}] ${x.name}`
        result.appendChild(courseNameText)

        let courseCodeText = document.createElement("p")
        courseCodeText.textContent = `Code: ${x.code}`
        result.appendChild(courseCodeText)

        let courseCreditHourText = document.createElement("p")
        courseCreditHourText.textContent = `Credit Hour(s): ${x.creditHour}`
        result.appendChild(courseCreditHourText)

        let courseMSTeamsLinkText = document.createElement("p")
        courseMSTeamsLinkText.textContent = `MS Teams Link: ${x.msTeamsLink}`
        result.appendChild(courseMSTeamsLinkText)

        CONTAINER.appendChild(result)
    })

    // for (let i = 0; i < COURSES.length; i++) {
    //     let result = document.createElement("div")
    //     result.id = "result"

    //     let courseNameText = document.createElement("h1")
    //     courseNameText.textContent = `[${i+1}] ${COURSES[i].name}`
    //     result.appendChild(courseNameText)

    //     let courseCodeText = document.createElement("p")
    //     courseCodeText.textContent = `Code: ${COURSES[i].code}`
    //     result.appendChild(courseCodeText)

    //     let courseCreditHourText = document.createElement("p")
    //     courseCreditHourText.textContent = `Credit Hour(s): ${COURSES[i].creditHour}`
    //     result.appendChild(courseCreditHourText)

    //     let courseMSTeamsLinkText = document.createElement("p")
    //     courseMSTeamsLinkText.textContent = `MS Teams Link: ${COURSES[i].msTeamsLink}`
    //     result.appendChild(courseMSTeamsLinkText)

    //     CONTAINER.appendChild(result)
    // }
} else {
    let result = document.createElement("div")
    result.id = "result"

    let courseNameText = document.createElement("p")
    courseNameText.textContent = "No courses found"
    result.appendChild(courseNameText)

    CONTAINER.appendChild(result)
}