var Tooltip = function($window) {

    this.$window = $window || null;
    this.session = {};

    this.smart = true;

    this.Collision = {
      none: 0,
      top: 1,
      bottom: 2,
      left: 4,
      right: 8
    };

    this.getViewportDimensions();

    return this;
};

Tooltip.prototype.getViewportDimensions = function() {

  var
    _window = this.$window,
    _session = this.session
  ;

  _session.scrollLeft = _window.scrollLeft();
  _session.scrollTop = _window.scrollTop();
  _session.windowWidth = _window.width();
  _session.windowHeight = _window.height();

  this.session = _session;

  return this;
};

Tooltip.prototype.cssCoords = function(placement) {
  var me = this;

  // initialize object properties
  me.top = 'auto';
  me.left = 'auto';
  me.right = 'auto';
  me.bottom = 'auto';

  me.placement = placement || 'n';

  /**
   * Set a property to a value.
   * @private
   * @param {string} property The name of the property.
   * @param {number} value The value of the property.
   */
  me.set = function(property, value) {
    if ($.isNumeric(value)) {
      me[property] = Math.round(value);
    }
  };
};

/**
 * Finds the tooltip attachment point in the document for a HTML DOM element
 * for the specified placement.
 * @param {jQuery} element The element that the tooltip should target.
 * @param {string} placement The placement for the tooltip.
 * @return {Object} An object with the top,left position values.
 */
Tooltip.prototype.getPosition = function(element, placement) {
  var
    objectOffset = element.offset(),
    objectWidth = element.outerWidth(),
    objectHeight = element.outerHeight(),
    left,
    top
  ;

  // calculate the appropriate x and y position in the document
  switch (placement) {
    case 'n':
            left = objectOffset.left + objectWidth / 2;
            top = objectOffset.top;
            break;
    case 'e':
            left = objectOffset.left + objectWidth;
            top = objectOffset.top + objectHeight / 2;
            break;
    case 's':
            left = objectOffset.left + objectWidth / 2;
            top = objectOffset.top + objectHeight;
            break;
    case 'w':
            left = objectOffset.left;
            top = objectOffset.top + objectHeight / 2;
            break;
    case 'nw':
            left = objectOffset.left;
            top = objectOffset.top;
            break;
    case 'ne':
            left = objectOffset.left + objectWidth;
            top = objectOffset.top;
            break;
    case 'sw':
            left = objectOffset.left;
            top = objectOffset.top + objectHeight;
            break;
    case 'se':
            left = objectOffset.left + objectWidth;
            top = objectOffset.top + objectHeight;
            break;
  }

  return {
    top: top,
    left: left
  };
};

/**
 * Compute the CSS position to display a tooltip at the specified placement
 * relative to the specified element.
 * @private
 * @param {jQuery} element The element that the tooltip should target.
 * @param {string} placement The placement for the tooltip.
 * @param {number} tipWidth Width of the tooltip element in pixels.
 * @param {number} tipHeight Height of the tooltip element in pixels.
 * @param {number} offset Distance to offset tooltips in pixels.
 * @return {CSSCoordinates} A CSSCoordinates object with the position.
 */
Tooltip.prototype.getCoords = function(element, placement, tipWidth, tipHeight, offset) {
  var
    placementBase = placement.split('-')[0],
    coords= new this.cssCoords(placement),
    position = this.getPosition(element, placementBase),
    session = this.session
  ;

  // calculate the appropriate x and y position in the document
  switch (placement) {
    case 'n':
            coords.set('left', position.left - (tipWidth / 2));
            coords.set('bottom', session.windowHeight - position.top + offset);
            break;
    case 'e':
            coords.set('left', position.left + offset);
            coords.set('top', position.top - (tipHeight / 2));
            break;
    case 's':
            coords.set('left', position.left - (tipWidth / 2));
            coords.set('top', position.top + offset);
            break;
    case 'w':
            coords.set('top', position.top - (tipHeight / 2));
            coords.set('right', session.windowWidth - position.left + offset);
            break;
    case 'nw':
            coords.set('bottom', session.windowHeight - position.top + offset);
            coords.set('right', session.windowWidth - position.left - 20);
            break;
    case 'nw-alt':
            coords.set('left', position.left);
            coords.set('bottom', session.windowHeight - position.top + offset);
            break;
    case 'ne':
            coords.set('left', position.left - 20);
            coords.set('bottom', session.windowHeight - position.top + offset);
            break;
    case 'ne-alt':
            coords.set('bottom', session.windowHeight - position.top + offset);
            coords.set('right', session.windowWidth - position.left);
            break;
    case 'sw':
            coords.set('top', position.top + offset);
            coords.set('right', session.windowWidth - position.left - 20);
            break;
    case 'sw-alt':
            coords.set('left', position.left);
            coords.set('top', position.top + offset);
            break;
    case 'se':
            coords.set('left', position.left - 20);
            coords.set('top', position.top + offset);
            break;
    case 'se-alt':
            coords.set('top', position.top + offset);
            coords.set('right', session.windowWidth - position.left);
            break;
  }

  return coords;
};

/**
* Finds any viewport collisions that an element (the tooltip) would have if it
* were absolutely positioned at the specified coordinates.
* @private
* @param {CSSCoordinates} coords Coordinates for the element.
* @param {number} elementWidth Width of the element in pixels.
* @param {number} elementHeight Height of the element in pixels.
* @return {number} Value with the collision flags.
*/
Tooltip.prototype.getViewportCollisions = function(coords, elementWidth, elementHeight) {

  var
    session = this.session,
    viewportTop = session.scrollTop,
    viewportLeft = session.scrollLeft,
    viewportBottom = viewportTop + session.windowHeight,
    viewportRight = viewportLeft + session.windowWidth,
    collision = this.Collision,
    collisions = this.Collision.none
  ;

  if (coords.top < viewportTop || Math.abs(coords.bottom - session.windowHeight) - elementHeight < viewportTop) {
          collisions = collisions || collision.top;
  }
  if (coords.top + elementHeight > viewportBottom || Math.abs(coords.bottom - session.windowHeight) > viewportBottom) {
          collisions = collisions || collision.bottom;
  }
  if (coords.left < viewportLeft || coords.right + elementWidth > viewportRight) {
          collisions = collisions || collision.left;
  }
  if (coords.left + elementWidth > viewportRight || coords.right < viewportLeft) {
          collisions = collisions || collision.right;
  }

  return collisions;
};


Tooltip.prototype.getSmartPlacementLists = function() {
  return {
    n: ['n', 'ne', 'nw', 's'],
    e: ['e', 'ne', 'se', 'w', 'nw', 'sw', 'n', 's', 'e'],
    s: ['s', 'se', 'sw', 'n'],
    w: ['w', 'nw', 'sw', 'e', 'ne', 'se', 'n', 's', 'w'],
    nw: ['nw', 'w', 'sw', 'n', 's', 'se', 'nw'],
    ne: ['ne', 'e', 'se', 'n', 's', 'sw', 'ne'],
    sw: ['sw', 'w', 'nw', 's', 'n', 'ne', 'sw'],
    se: ['se', 'e', 'ne', 's', 'n', 'nw', 'se'],
    'nw-alt': ['nw-alt', 'n', 'ne-alt', 'sw-alt', 's', 'se-alt', 'w', 'e'],
    'ne-alt': ['ne-alt', 'n', 'nw-alt', 'se-alt', 's', 'sw-alt', 'e', 'w'],
    'sw-alt': ['sw-alt', 's', 'se-alt', 'nw-alt', 'n', 'ne-alt', 'w', 'e'],
    'se-alt': ['se-alt', 's', 'sw-alt', 'ne-alt', 'n', 'nw-alt', 'e', 'w']
  };
};

Tooltip.prototype.getSmartPlacement = function(element, placement, tipWidth, tipHeight, offset) {

  var
    self = this,
    smartPlacementLists = this.getSmartPlacementLists()[placement],
    smartPlacement
  ;

  $.each(smartPlacementLists, function(idx, pos) {

    //console.info('<======MINIPROFILE: TEST COLLISION FOR =====>', pos);

    var
      coords = self.getCoords(
        element,
        pos,
        tipWidth,
        tipHeight,
        offset
      ),
      collisions = self.getViewportCollisions(
        coords,
        tipWidth,
        tipHeight
      )
    ;

    // update the final placement variable
    smartPlacement = pos;

    // break if there were no collisions
    if (collisions === self.Collision.none) {
      return false;
    }
  });

  //console.info('<======MINIPROFILE: NO COLLISION FOR =====>', smartPlacement);

  return smartPlacement;
};

/**
 * @private
 * @param {jQuery} element The element that the tooltip should target.
 * @param {string} placement The placement for the tooltip.
 * @param {number} tipWidth Width of the tooltip element in pixels.
 * @param {number} tipHeight Height of the tooltip element in pixels.
 * @param {number} offset Distance to offset tooltips in pixels.
 * @return {CSS} A CSSCoordinates object with the final position. Refer to the getCoords method.
 */

Tooltip.prototype.getCss = function(element, placement, tipWidth, tipHeight, offset) {

  var smartPlacement= this.getSmartPlacement(element, placement, tipWidth, tipHeight, offset);
  return this.getCoords(
    element,
    smartPlacement,
    tipWidth,
    tipHeight,
    offset
  );


};

export default Tooltip;
