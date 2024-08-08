export function getStorage(name) {
	try {
		return JSON.parse(localStorage.getItem(name));
	} catch (e) {
		return null;
	}
}

export function setStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data))
}
