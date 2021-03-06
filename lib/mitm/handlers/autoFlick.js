const haversine = require('haversine');
const mitmConfig = require('../../config').mitm;
const api = require('../../api');

module.exports = mitmServer => {
  mitmServer.addResponseHandler('GetMapObjects', (data, action) => {
    try {
      var now = (new Date()).getTime();
      app.locals.mapCells = data.map_cells;
      // Find all nearby pokestops that can be activated
      forts = _.flatten(data.map_cells.map(cell => cell.forts));
      console.log('total of', forts.length, 'forts')
      flickableForts = forts.filter((fort) => {
        if (fort.type != 'CHECKPOINT') return;
        if (fort.cooldown_complete_timestamp_ms <= now || !fort.cooldown_complete_timestamp_ms) {
          var fortLocation = {
            latitude: fort.latitude,
            longitude: fort.longitude,
          };
          var distance = haversine(app.locals.player.location, fortLocation);
          if (distance < 0.05) {
            return fort;
          }
        }
        return null;
      });
      
      flickableForts = [];

      console.log('found', flickableForts.length, 'flickable forts');

      if (mitmConfig.autoFlick) {
        var requests = flickableForts.map((fort) => {
          return api.searchPokestop(fort);
        });
        requests.forEach((req) => {
          req.on('error', e => {
            console.error('Flicking pokestop failed');
            console.error(e);
          }).on('response', res => {
            console.log('Flicking pokestop succeeded');
          });
        });
      } 
    } catch(e) {
      console.error(e.stack);
    }
  });
}
