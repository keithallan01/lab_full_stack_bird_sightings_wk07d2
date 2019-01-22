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
  // subscribe to "new sighting submitted"
  PubSub.subscribe('SightingView: sighting-submitted', (evt) => {
    this.postNewSighting(evt.detail);
    // post the new sighting
  });
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
      .then((sightings) => { // this happens after the request (post request) gets fulfilled by the server side
        PubSub.publish('Sightings:data-loaded', sightings); // it returns all the bird data and publishes it for the view to render
    })
    .catch(console.error);
};

module.exports = Sightings;
