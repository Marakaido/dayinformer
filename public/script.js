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
            result += launchTemplate(data[i]);
            
        return result;
    }
    else throw new Exception();
}

function launchTemplate(data) {
    return `<div class="card">
            <table cellspacing="0" cellpadding="0">
                <colgroup>
                    <col class="fieldSpecifier" />
                    <col />
                </colgroup>
                <tbody>
                    <tr><td class="label">Name:</td><td style="font-weight: 700;">${data.name}</td></tr>
                    <tr><td class="label">Starts:</td><td>${data.start}</td></tr>
                    <tr><td class="label">Ends:</td><td>${data.end}</td></tr>
                    <tr><td class="label">Info:</td><td>${linkArrayTemplate(data.info)}</td></tr>
                    <tr><td class="label">Videos:</td><td>${linkArrayTemplate(data.vids)}</td></tr>
                    <tr><td class="label">Location:</td><td>${data.location}</td></tr>
                </tbody>
            </table>
            </div>
    `;
}

function linkArrayTemplate(data) {
    if(data == null || data.length == 0) return 'no data';

    let result = `<a href="${data[0]}">${data[0]}</a>`;
    for(let i = 1; i < data.length; i++)
        result += `<br /><a href="${el}">${el}</a>`;

    return result;
}

function issTemplate(data) {
    return `
        <div class="asideHeader">International Space Station</div>
        <table style="margin: auto;">
        <tr><td><p style="font-weight: 700;">Location: </p></td><td>${locationTemplate(data.location)}</td></tr>
        <tr><td valign="top"><p style="font-weight: 700;">Astronauts: </p></td><td>${peopleTemplate(data.people)}</td></tr>
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
        <div class="asideHeader">Fun fact of the day</div>
        <p style="margin: 10px; text-align: justify;">${data}</p>
    `;
}