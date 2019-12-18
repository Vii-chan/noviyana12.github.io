const API_KEY = "42b0bef5d2de422cbe89192ec44ffc1b";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_CL_ID = 2001;
const LEAGUE_PL_ID = 2021;

const ENDPOINT_CL_COMPETITION = `${BASE_URL}competitions/${LEAGUE_CL_ID}/standings`;
const ENDPOINT_PL_COMPETITION = `${BASE_URL}competitions/${LEAGUE_PL_ID}/standings`;
const ENDPOINT_PL_MATCHES = `${BASE_URL}competitions/PL/matches?status=SCHEDULED`;
const ENDPOINT_CL_TEAMS = `${BASE_URL}competitions/${LEAGUE_CL_ID}/teams`;
const ENDPOINT_PL_TEAMS = `${BASE_URL}competitions/${LEAGUE_PL_ID}/teams`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function changeDate(date) {
    var date = new Date(date);
    var month = ["January", "February", "March", 
                 "April", "May", "June", "July",
                 "August", "September", "October",
                 "November", "December"
                ];

    return month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

function getAllCLStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_CL_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Standing Data: " + data);
                    showCLStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_CL_COMPETITION)
        .then(data => {
            showCLStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getAllPLStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_PL_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Standing Data: " + data);
                    showPLStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_PL_COMPETITION)
        .then(data => {
            showPLStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showCLStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("clStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card yellow darken-2 z-depth-5" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="striped yellow darken-2 responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                </div>
    `;
}

function showPLStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("plStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="col s12 m12">
                <div class="card yellow darken-2 z-depth-5" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="striped yellow darken-2 responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Won</th>
                            <th>Draw</th>
                            <th>Lost</th>
                            <th>Points</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                </div>
                </div>
    `;
}
function getPLUpcomingMatches(){
    if ("caches" in window) {
        caches.match(ENDPOINT_PL_MATCHES).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Upcoming Matches: " + data);
                    showPLUpcomingMatches(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_PL_MATCHES)
        .then(data => {
            showPLUpcomingMatches(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showPLUpcomingMatches(data) {
    let upMatches = "";
    let upMatchElement =  document.getElementById("upcomingMatch");

    data.matches.slice(0,1).forEach(function (upMatch) {
        upMatches += `
                <div class="card card-background yellow darken-2 z-depth-5">
                  <div class="card-content  black-text">
                    <div class="card-title">${upMatch.group}</div>
                    <h4 style="font-size: 20px; background-color: black; color: white";>${changeDate(upMatch.season.startDate, true)}<span>  till  </span>${changeDate(upMatch.season.endDate, true)}</h4>
                  </div>
                  <div class="card-action">
                    <div class="row ">
                      <div class="col s4 m4 center-align isi">${upMatch.homeTeam.name}</div>
                      <div class="col s3 m2 center-align"><span class="badge red white-text">VS</span></div>
                      <div class="col s4 m4 right-align isi">${upMatch.awayTeam.name}</div>
                    </div>
                    <div class="row">
                      <div class="col s12 m11">
                        <p class="time"><span>Matchday : </span> ${upMatch.matchday}</p>
                      </div>
                    </div>
                  </div>
               </div>
        `;
    });

    upMatchElement.innerHTML = `${upMatches}`;
}

function getCLTeams(){
    if ("caches" in window) {
        caches.match(ENDPOINT_CL_TEAMS).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("CL Teams: " + data);
                    showCLTeams(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_CL_TEAMS)
        .then(data => {
            showCLTeams(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showCLTeams(data) {
    let teams = "";
    let teamsElement =  document.getElementById("teams");

    data.teams.slice(0,3).forEach(function (team) {
        teams += `
          <div class="col s12 m4">
            <div class="card yellow darken-2 z-depth-5">
               <div class="card-image waves-effect waves-block waves-light">
                 <img class="activator center-align" style="height: 200px; width: 200px; 
                 display: block; margin-left: auto; margin-right: auto; margin-top: 20px;" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
               </div>
               <div class="card-content">
                 <span class="card-title activator grey-text text-darken-4">${team.name}
                    <i class="material-icons right">more_vert</i>
                 </span>
               </div>
               <div class="card-reveal yellow darken-2 z-depth-5">
                  <span class="card-title grey-text text-darken-4">${team.name}
                    <i class="material-icons right">close</i></span><hr style="border-color: black;">
                      <br><br><br>
                  <div class="row address">
                    <div class="col s4 m4 content" style="background-color:black; color: white">Address :</div>
                    <div class="col s8 m8 content">${team.address}</div>
                  </div>
                  <div class="row phone">
                    <div class="col s4 m4 content" style="background-color:black; color: white">Phone :</div>
                    <div class="col s8 m8 content">${team.phone}</div>
                  </div>
                  <div class="row phone">
                    <div class="col s4 m4 content" style="background-color:black; color: white">Website :</div>
                    <div class="col s8 m8 content">${team.website}</div>
                  </div>
                  <div class="row phone">
                    <div class="col s4 m4 content" style="background-color:black; color: white">Email :</div>
                    <div class="col s8 m8 content">${team.email}</div>
                  </div>
                </div>
              </div>
            </div>
        `;
      });

     teamsElement.innerHTML = `${teams}`;
}

function getAllPLTeams(){
    if ("caches" in window) {
        caches.match(ENDPOINT_PL_TEAMS).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("All PL Teams: " + data);
                    showAllPLTeams(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_PL_TEAMS)
        .then(data => {
            showAllPLTeams(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showAllPLTeams(data, id) {
    var AllTeams = "";
    var AllTeamsElement =  document.getElementById("PLTeams");

    data.teams.forEach(function (team) {
        AllTeams += `
                <div class="col s12 m4">
                  <div class="card yellow darken-2 z-depth-5">
                     <div class="card-image waves-effect waves-block waves-light">
                       <img class="activator center-align" style="height: 200px; width: 200px; 
                            display: block; margin-left: auto; margin-right: auto; margin-top: 20px;" 
                            src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                     </div>
                     <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${team.name}
                           <i id="team-${team.id}" class="material-icons right favorite red-text" onclick="toggle('${team.id}','${
                           team.name}', '${team.address}', '${team.phone}', '${team.website}', 
                           '${team.venue}', '${team.crestUrl.replace(/^http:\/\//i, 'https://')}')">favorite_border</i>
                           <i class="material-icons right hide-on-med-and-down activator">more_vert</i>
                        </span>
                     </div>
                     <div class="card-reveal yellow darken-2 z-depth-5">
                        <span class="card-title grey-text text-darken-4">${team.name}<i class="material-icons right">close</i></span><hr style="border-color: black;"><br><br><br>
                        <div class="row address">
                          <div class="col s4 m4 content" style="background-color:black; color: white">Address :</div>
                          <div class="col s8 m8 content">${team.address}</div>
                        </div>
                        <div class="row phone">
                          <div class="col s4 m4 content" style="background-color:black; color: white">Phone :</div>
                          <div class="col s8 m8 content">${team.phone}</div>
                        </div>
                        <div class="row phone">
                          <div class="col s4 m4 content" style="background-color:black; color: white">Website :</div>
                          <div class="col s8 m8 content">${team.website}</div>
                        </div>
                        <div class="row phone">
                          <div class="col s4 m4 content" style="background-color:black; color: white">Venue :</div>
                          <div class="col s8 m8 content">${team.venue}</div>
                        </div>
                      </div>
                   </div>
                </div>
        `;
    });
    AllTeamsElement.innerHTML = `${AllTeams}`;
}

function showFavoriteTeam(data, id){
        var AllTeams = "";
        if(data.length > 0){
           document.getElementById("em").setAttribute("style", "display: none");
           data.forEach(function (team) {
    
            AllTeams += `
                    <div class="col s12 m4">
                      <div class="card yellow darken-2 z-depth-5">
                         <div class="card-image waves-effect waves-block waves-light">
                           <img class="activator center-align" style="height: 200px; width: 200px; 
                           display: block; margin-left: auto; margin-right: auto; margin-top: 20px;" 
                           src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                         </div>
                         <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">${team.name}
                              <i id="team-${team.id}" class="material-icons right favorite red-text" onclick="toggle('${team.id}','${
                                 team.name}', '${team.address}', '${team.phone}', '${team.website}', 
                                 '${team.venue}', '${team.crestUrl.replace(/^http:\/\//i, 'https://')}')">
                                   favorite
                              </i>
                              <i class="material-icons right hide-on-med-and-down activator">more_vert</i>
                            </span>
                          </div>
                          <div class="card-reveal yellow darken-2 z-depth-5">
                            <span class="card-title grey-text text-darken-4">${team.name}<i class="material-icons right">close</i></span>
                              <hr style="border-color: black;"><br><br><br>
                            <div class="row address">
                              <div class="col s4 m4 content" style="background-color:black; color: white">Address :</div>
                              <div class="col s8 m8 content">${team.address}</div>
                            </div>
                            <div class="row phone">
                              <div class="col s4 m4 content" style="background-color:black; color: white">Phone :</div>
                              <div class="col s8 m8 content">${team.phone}</div>
                            </div>
                            <div class="row phone">
                              <div class="col s4 m4 content" style="background-color:black; color: white">Website :</div>
                              <div class="col s8 m8 content">${team.website}</div>
                            </div>
                            <div class="row phone">
                              <div class="col s4 m4 content" style="background-color:black; color: white">Venue :</div>
                              <div class="col s8 m8 content">${team.venue}</div>
                            </div>
                          </div>
                        </div>
                      </div>
            `;
            return (document.getElementById(id).innerHTML = AllTeams);
        });
        } else{
            document.getElementById("title").setAttribute("style", "display: none");
            document.getElementById("em").setAttribute("style", "display: block");
            return (document.getElementById(id).innerHTML = "");
        }
    }

function toggle(
    id, name, address,
    phone, website, venue, crestUrl
    ) {
    var icon = document.getElementById("team-"+ id);
    if (icon.innerHTML === "favorite_border") {
        var team = {
            id: id,
            name: name,
            address: address,
            phone: phone,
            website: website,
            venue: venue,
            crestUrl: crestUrl
        };

        addFavTeam(team).then(function () {
            icon.innerHTML = "favorite";

            M.toast({
                html: 'This is Your Favorite!',
                classes: 'rounded'
            });
        }).catch(function (error) {

            console.log(error);

            M.toast({
                html: 'Failed add to favorite',
                classes: 'rounded'
            });
        });

    } else {
        deleteFavoriteTeam(id).then(function () {
            icon.innerHTML = "favorite_border";

            M.toast({
                html: 'Removed from favorite',
                classes: 'rounded'
            });

            getFavoriteTeam();
        }).catch(function (error) {

            console.log(error);

            M.toast({
                html: 'failed remove from Favorite',
                classes: 'rounded'
            });
        });
    }
}



