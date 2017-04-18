const baseUrl = "http://localhost:3002";


export const getBooks = () => {
    fetch(`${baseUrl}/books`)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            return error;
        });
}
