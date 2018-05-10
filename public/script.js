window.onload = () => {
    console.log("Page loaded");
    fetch('package')
    .then(function(response) {
        let launch = response.json().then((data) => {
            document.getElementById("launch").innerHTML = launchesTemplate(data.launches);
            document.getElementById("fact").innerHTML = factTemplate(data.dayfact);
            document.getElementById("iss").innerHTML = issTemplate(data.iss);
        });
    });
}

function launchesTemplate(data) {
    if (data.length != 0) {
        let result = launchTemplate(data[0]);
        for (let i = 1; i < data.length; i++)
            result += '<hr />' + launchTemplate(data[i]);
            
        return result;
    }
    else throw new Exception();
}

function launchTemplate(data) {
    return `
            <table>
                <tr><td>Name:</td><td>${data.name}</td></tr>
                <tr><td>Starts:</td><td>${data.start}</td></tr>
                <tr><td>Ends:</td><td>${data.end}</td></tr>
                <tr><td>Info:</td><td>${linkArrayTemplate(data.info)}</td></tr>
                <tr><td>Videos:</td><td>${linkArrayTemplate(data.vids)}</td></tr>
                <tr><td>Location:</td><td>${data.location}</td></tr>
            </table>
    `;
}

function linkArrayTemplate(data) {
    if(data == null || data.length == 0) return 'no data';

    let result = '<ul>';
    data.forEach((el) => {
        result += `<li><a href="${el}">${el}</a></li>`;
    });
    result += '</ul>';
    return result;
}

function issTemplate(data) {
    return `
        <h1>International Space Station</h1>
        <table>
        <tr><td><p>Location: </p></td><td>${locationTemplate(data.location)}</td></tr>
        <tr><td valign="top"><p>Astronauts: </p></td><td>${peopleTemplate(data.people)}</td></tr>
        </table>
    `;
}

function peopleTemplate(data) {
    let result = '';
    data.people.forEach(person => {
        result += `<p>${personTemplate(person)}</p>`;
    });

    return result;
}

function personTemplate(data) {
    return data.name;
}

function locationTemplate(data) {
    return `${data.iss_position.latitude} ${data.iss_position.longitude}`;
}

function factTemplate(data) {
    return `
        <h1>Fun fact of the day</h1>
        <p>${data}</p>
    `;
}