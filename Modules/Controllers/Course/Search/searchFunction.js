// Returns the object from local storage
export function searchWith(input, from, at) {
    let GET = JSON.parse(localStorage.getItem("courses")) || []

    if (at != null) {
        if (at.toLowerCase() == "students") {
            console.log("found data")
            GET = JSON.parse(localStorage.getItem("students")) || []
        }
    }

    for (let i=0; i<GET.length; i++) {
        if (input === GET[i][from]) {
            return GET[i]
        }
    }

    return null
}

// Returns the index of object from local storage
export function searchIndexWith(input, from, at) {
    let GET = JSON.parse(localStorage.getItem("courses")) || []

    if (at != null) {
        if (at.toLowerCase() == "students") {
            GET = JSON.parse(localStorage.getItem("students")) || []
        }
    }

    for (let i=0; i<GET.length; i++) {
        if (input === GET[i][from]) {
            return i
        }
    }

    return null
}