class Tasks {
    getTasksList() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/test', true);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }
    addUser(newUser) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:3000/api/game', true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send(JSON.stringify(newUser));
        });
    }
    getUsersList() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/game', true);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }
}

export default Tasks;