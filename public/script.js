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
                <tr><td>Info:</td><td>${data.info}</td></tr>
                <tr><td>Videos:</td><td>${data.vids}</td></tr>
                <tr><td>Location:</td><td>${data.location}</td></tr>
            </table>
    `;
}

function issTemplate(data) {
    return `
        <table>
        <tr><td>Location: </td><td>${locationTemplate(data.location)}</td></tr>
        <tr><td colspan="2"> </td></tr>
        <tr><td colspan="2">Astronauts:<br />${peopleTemplate(data.people)}</td></tr>
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
    return data;
}