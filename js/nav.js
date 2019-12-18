document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
 
  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
 
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
          // Tutup sidenav
          var sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();
 
          // Muat konten halaman yang dipanggil
          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
          });
        });
      };
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

 
   
  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          loadApi(page);
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  window.onhashchange = function() {
    this.console.log("Ok! Validated");
    valPage(page);
  };
   valPage(page);

  //validate a page
  function valPage(page) {
    if (page === ""){
      page = "home"
    }else if (page === "matches") {
      loadTab(page);
    } else if (page === "standing"){
      loadStandingTab(page);
    }else {
      document.getElementById("tab").innerHTML = "";
    }

    loadPage(page);
  }

  //load a tab 
  function loadTab(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#tab");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          var tabs = document.querySelector("ul.tabs");
          M.Tabs.init(tabs);
          toggleTab();
        } else if (this.status == 404) {
          content.innerHTML = "<p> Halaman tidak ditemukan </p>";
        } else {
          content.innerHTML = "<p> Ups.. halaman tidak dapat diakses </p>";
        }
      }
    };
    xhttp.open("GET", "pages/tabs/" + page + ".html", true);
    xhttp.send();
  }

  function loadStandingTab(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#tab");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          var tabs = document.querySelector("ul.tabs");
          M.Tabs.init(tabs);
          toggleStandingTab();
        } else if (this.status == 404) {
          content.innerHTML = "<p> Halaman tidak ditemukan </p>";
        } else {
          content.innerHTML = "<p> Ups.. halaman tidak dapat diakses </p>";
        }
      }
    };
    xhttp.open("GET", "pages/standingtabs/" + page + ".html", true);
    xhttp.send();
  }
});

function toggleStandingTab() {
  var standingLink = document.querySelectorAll(".tabs .tab a");
  standingLink[0].addEventListener("click", function() {
    document.getElementById("CL").setAttribute("class", "active");
    document.getElementById("CL").setAttribute("style", "display: block");
    document.getElementById("PL").setAttribute("style", "display: none");
  });
  standingLink[1].addEventListener("click", function() {
    document.getElementById("PL").setAttribute("class", "active");
    document.getElementById("PL").setAttribute("style", "display: block");
    document.getElementById("CL").setAttribute("style", "display: none");
  });
}

function loadApi(page) {
  switch (page) {
    case "standing":
      getAllCLStandings();
      getAllPLStandings();
      break;
    case "home":
       getPLUpcomingMatches();
       getCLTeams();
       break;
    case "teams":
       getAllPLTeams();
       break;
    case "favorites":
      getFavoriteTeam();
      break;
    default:
      break;
  }
}
