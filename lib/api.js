var proto = require('pokemongo-protobuf');
var request = require('request');


var requestId = Math.round(Math.random() * 10000000);
function getId() {
  return requestId++;
}

// Just replace this with a lib at some point please
var api = module.exports = {
  wrapInRequestEnvelope: (payloads) => {
    if (!_.isArray(payload)) payloads = [payloads];

    var envelope = {
      status_code: 2,
      request_id: getId(),
      requests: payloads,
      unknown6: {
        unknown1: 6,
        unknown2: {unknown1: 1},
      },
      latitude: app.locals.player.location.latitude,
      longitude: app.locals.player.location.longitude,
      altitude: app.locals.player.location.altitude,
      auth_info: app.locals.authInfo,
      auth_ticket: app.locals.authTicket,
      unknown12: -1,
    };

    envelope = proto.serialize(envelope, 'POGOProtos.Networking.Envelopes.RequestEnvelope');
    return envelope;
  },

  wrapInRequest: (payload, type) => {
    return proto.serialize({
      request_type: type,
      request_message: payload,
    }, 'POGOProtos.Networking.Requests.Request');
  },

  searchPokestop: (fort) => {
    var payload = {
      fort_id: fort.id,
      player_latitude: app.locals.player.location.latitude,
      player_longitude: app.locals.player.location.longitude,
      fort_latitude: fort.latitude,
      fort_longitude: fort.longitude,
    };

    var envelope = this.wrapInRequestEnvelope(this.wrapInRequest(payload, 'FORT_SEARCH'));
    return request.post(app.locals.apiEndpoint, envelope);
  },

  releasePokemon: (pokemonOrId) => {
    var id = pokemonOrId;
    if (_.isObject(pokemonOrId)) {
      id = pokemonOrId.id;
    }
    var payload = {
      'pokemon_id': id,
    };

    return this.request(this.wrapInRequestEnvelope(this.wrapInRequest(payload, 'RELEASE_POKEMON')));
  },

  request: (envelope) => {
    return request.post(app.locals.apiEndpoint, envelope);
  }
}
