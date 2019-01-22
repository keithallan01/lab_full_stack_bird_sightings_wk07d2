const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Sightings.prototype.bindEvents = function () {
  PubSub.subscribe('SightingView:sighting-delete-clicked', (evt) => {
    this.deleteSighting(evt.detail);
  });
  PubSub.subscribe('SightingView: sighting-submitted', (evt) => {
    this.postNewSighting(evt.detail);
  });
  // subscribe to "new sighting submitted"
};

Sightings.prototype.getData = function () {
  this.request.get()
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.deleteSighting = function (sightingId) {
  this.request.delete(sightingId)
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.postNewSighting = function (evt) {
  // create a new request helper with this.url
  // ask req.helper to post with incoming event
  // with the response from server: publish the entire list of viewings
    this.request.post(evt)
      .then((sightings) => {
        PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

module.exports = Sightings;
