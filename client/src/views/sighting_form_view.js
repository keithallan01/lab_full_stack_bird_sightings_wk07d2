const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js');

const SightingFormView = function (form) {
  this.form = form;
};

SightingFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

SightingFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  // create a new viewing instance from the event
  // publish it to the sightings model
  const newViewing = this.createNewViewing(evt.target);
  debugger
  PubSub.publish('SightingView: sighting-submitted', newViewing);
  evt.target.reset();
  console.log(newViewing);

}

SightingFormView.prototype.createNewViewing = function (form) {
  const newViewing = {
    species: form.species.value,
    location: form.location.value,
    date: form.date.value
  }

  return newViewing
};

module.exports = SightingFormView;
