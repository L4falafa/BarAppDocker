function newSession() {

    console.log(getDate());
    axios.post('/sesiones/newSession', 
    {
        fecha: getDate(),
        time: getTime()
    },
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(function (response) {
        console.log(response);
        window.location.href = "/caja";
    })
    .catch(function (error) {
        console.log(error);
    });
}


//funtion to get the date on format yyyy-mm-dd hh:mm:ss
function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
}
//funtion to get the time on hh:mm:ss
function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${hour}:${minutes}:${seconds}`;
}
