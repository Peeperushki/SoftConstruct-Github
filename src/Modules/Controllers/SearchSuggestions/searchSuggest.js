// Suggest all cached searches from cached list
export function suggestAll(cacheKey, to) {
    let cache = JSON.parse(localStorage.getItem(cacheKey)) || [];
    if (cache.length <= 0){return}

    to.replaceChildren();
    for (let i=0; i<cache.length; i++) {
        let option = document.createElement("option");
        option.id = "search-suggestion-option-" + i;
        option.value = cache[i];
        to.appendChild(option);
    }
}

// update search cache
export function updateCache(cacheKey, value) {
    let cache = JSON.parse(localStorage.getItem(cacheKey)) || []

    // Check if value is already in list
    for (let i=0; i<cache.length; i++) {
        if (cache[i] === value) {
            return;
        }
    }

    cache.push(value);
    localStorage.setItem(cacheKey, JSON.stringify(cache));
}