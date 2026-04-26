// Display all students enrolled in a course
export function displayStudentsInCourse(data, to, courseCode) {
    if (data == null) { return };

    // Clear list
    to.replaceChildren();

    data.forEach((x, i) => {
        // Create details
        let result = document.createElement("div")
        result.id = `student-data-container-${x.id}-${courseCode}`

        let studentData = document.createElement("span")
        studentData.id = `student-data-${x.id}-${courseCode}`
        studentData.textContent = `[${i + 1}] ${x.name} | ${x.id} | ${x.email} | ${x.phoneNumber}`
        result.appendChild(studentData)

        to.appendChild(result)
    });
}

// Display one strudent enrolled in a course
export function displaySingleStudentInCourse(data, order, to, courseCode) {
    if (data == null) { return };

    // Clear list
    to.replaceChildren();

    // Create details
    let result = document.createElement("div")
    result.id = `student-data-container-${data.id}-${courseCode}`

    let studentData = document.createElement("span")
    studentData.id = `student-data-${data.id}-${courseCode}`
    studentData.textContent = `[${order}] ${data.name} | ${data.id} | ${data.email} | ${data.phoneNumber}`
    result.appendChild(studentData)

    to.appendChild(result);
}

// Find student in a course
export function findStudent(to, courseCode, htmlList) {
    // Fetch courses data
    let courses = JSON.parse(localStorage.getItem("courses")) || []

    // Search bar creation for user to be able to search
    let container = document.createElement("div");
    container.id = `find-student-container-${courseCode}`

    let searchLabel = document.createElement("label");
    searchLabel.textContent = "Search student";
    searchLabel.for = `find-student-search-${courseCode}`;
    container.appendChild(searchLabel);
    container.appendChild(document.createElement("br"));

    let search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Enter Student ID";
    search.id = `find-student-search-${courseCode}`
    search.name = `find-student-search-${courseCode}`
    search.setAttribute("list", "students-history");
    container.appendChild(search);

    search.addEventListener("input", function (event) {
        event.preventDefault();

        // Check if search value is not empty
        if (search.value != "" && search.value.length > 0) {
            courses.forEach((x, _) => {
                if (x.code == courseCode) {
                    x.students.forEach((student, i) => {
                        if (student.id === search.value) {
                            displaySingleStudentInCourse(student, i+1, htmlList, courseCode);
                        }
                    });
                }
            });
        } else {
            courses.forEach((x, _) => {
                if (x.code == courseCode) {
                    displayStudentsInCourse(x.students, htmlList, courseCode);
                }
            })
        }
    })

    to.appendChild(container);
}