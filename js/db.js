var dbPromised = idb.open("soccer-sport", 1, function(upgradeDb) {
  var matchsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
  });
});

function addFavTeam(team) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");    
            resolve(store.add(team));
        });
    });
}

function getFavoriteTeam() {
  dbPromised.then(function(db) {
      var tx = db.transaction("teams", "readonly");
      var store = tx.objectStore("teams");
      return store.getAll();
  })
     .then(function(teams) {
      showFavoriteTeam(teams, "fav-team");
     })
    .catch(function(error) {
      console.log(error);
    });
}

function deleteFavoriteTeam(id) {
  return new Promise(function (resolve, reject) {
    dbPromised.then(function (db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      resolve(store.delete(id));
    });
  });
}
