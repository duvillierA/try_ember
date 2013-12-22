import Resolver from 'resolver';
import miniprofileEvents from 'appkit/events/miniprofile';

import truncateHelper from 'appkit/helpers/truncate';
import translateHelper from 'appkit/helpers/truncate';
Ember.Handlebars.registerBoundHelper('truncate', truncateHelper);
Ember.Handlebars.registerBoundHelper('t', translateHelper);

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default'],
  rootElement: '#ember-global'
});

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more important
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

  (function ($) {
    miniprofileEvents();
  })(window.jQuery);

export default App;
