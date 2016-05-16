module.exports = {
  getGames: function (req, res) {
    var Steam = require('steam-webapi');
    // Set global Steam API Key
    Steam.key = "5CCBEDB3AE3F4EF6A08B214EAEC4B619";

    Steam.ready(function(err) {
      if (err) return console.log("what", err);
      var steam = new Steam();     

      console.log('1');

      steam.resolveVanityURL({vanityurl:'maaeday'}, function(err, data) {


        console.log('2');

        data.include_appinfo = true;
        data.include_played_free_games=false;
        data.appids_filter="";
        steam.getOwnedGames(data, function(err,data) {
          console.log(data);
          var games = data.games;
          var neverPlayed = [];
          for(var i=0; i <games.length; i++)
            if (games[i].playtime_forever == 0){
              neverPlayed.push(games[i]);
            }
            console.log(neverPlayed);
            neverPlayed = neverPlayed.sort('name ASC');
            var rand = neverPlayed[Math.floor(Math.random() * neverPlayed.length)];
          return res.view('dashboard/selectGame', {
            user: 'meagan',
            games: neverPlayed,
            randomGame: rand
          })
        });
      })
    });
  }
};

