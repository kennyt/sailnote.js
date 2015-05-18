(function(){
  var SLIDESTYLES = {
    'height': '100%',
    'width': '100%',
    'position': 'relative'
  };

  var addStylesToSlides = function(){
    var cards = $('.sn-slide');
    $(cards).css(SLIDESTYLES);
  };

  var bindScroll = function(){
    var scrollDirection, ts;
    var element = $('html,body');

    element.on('DOMMouseScroll wheel',function(e){
      if(scrollBinded){
        var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
        if (theEvent != 0){
          scrollDirection = theEvent / 120 > 0 ? 'up' : 'down';

          snapScroll(scrollDirection);
          return false;
        }
      }
    });

    element.on('touchstart', function (e){
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      ts = touch.pageY || e.pageY;
    });

    element.on('touchmove', function (e){
      e.preventDefault();

      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      var currentY = touch.pageY || e.pageY;
      
      scrollDirection = currentY < ts ? 'down' : 'up';
      snapScroll(scrollDirection);
    });

    $('html,body').on('keydown', function(e){
      var UP = 38;
      var DOWN = 40;

      var getKey = function(e) {
        if(window.event) { return e.keyCode; }  // IE
        else if(e.which) { return e.which; }    // Netscape/Firefox/Opera
      };

      var keynum = getKey(e);
      if(keynum === UP) {
        snapScroll('up', 200);
        return false;
      }

      if(keynum === DOWN) {
        snapScroll('down', 200);
        return false;
      }
    })
  };

  var snapScroll = function(direction, delay){
    console.log(direction);
    var body = $('body');
    if(body.attr('scrolling') === '1') { return; }

    body.attr('scrolling','1');
    var sections = $('.sn-slide');
    var prevSection = sections[sectionNumber];

    if (direction == 'down'){
      var len = sections.length;
      sectionNumber = sectionNumber >= len - 2 ? len - 1 : sectionNumber + 1;
    } else {
      sectionNumber = sectionNumber < 1 ? 0 : sectionNumber - 1;
    }

    var section = sections[sectionNumber];
    var sectionTop = $(section).offset().top;

    // trigger any functions on leave/enter
    triggerEvents(section, 'enter');
    triggerEvents(prevSection, 'leave');

    //animations
    $('html,body').animate({ scrollTop: sectionTop},{duration: 750});
    $(section).animate({'padding-top': parseInt($(section).css('padding-top')) + 'px'}, 160);

    setTimeout(function(){
      body.attr('scrolling','0');
    }, delay || 1250);
  };

  var triggerEvents = function(section, event){
    var id = $(section).attr('sn-id');

    var events = id !== undefined ? listening[id] : false;
    var allEvents = listening['snAll'];

    allEvents = allEvents && allEvents[event] ? allEvents[event] : [];

    var listeners = [];

    if(events && events[event]){
      listeners = listeners.concat(events[event]);
    }

    if(allEvents.length){
      listeners = listeners.concat(allEvents);
    }

    for(var i = 0; i < listeners.length; i++){
      var cb = listeners[i];
      cb($(section));
    }
  };
  
  var on = function(event, id, cb){
    if(arguments.length === 2){
      cb = id;
      id = 'snAll';
    }

    listening[id] = listening[id] || {};
    listening[id][event] = listening[id][event] || [];

    listening[id][event].push(cb);
    console.log(listening);
  };

  // INITIAL VARIABLES
  var sectionNumber = 0;
  var listening = {};
  var scrollBinded = true;

  var initialize = function(options){
    options = options || {};

    addStylesToSlides();
    bindScroll();
    sectionNumber = 0;

    if(options.bindScroll){
      scrollBinded = options.bindScroll;
    }

    setTimeout(function(){
      $(window).scrollTop(0);
    }, 0);
  };

  window.Sailnote = {
    init: initialize,
    on: on,
    back: snapScroll.bind(null, 'up'),
    next: snapScroll.bind(null, 'down')
  };
})();

