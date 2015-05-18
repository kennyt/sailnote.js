# sailnote.js
A tiny and minimalist library that allows you to easily create a slideshow with HTML/JS

![example](http://zippy.gfycat.com/EvilCompleteCoqui.gif)


The HTML for the gif above is:
```html
  <div class="sn-slide">sailnote is a</div>
  <div class="sn-slide" sn-id="fadeIn">minimalist</div>
  <div class="sn-slide">javascript library</div>
  <div class="sn-slide">that helps you</div>
  <div class="sn-slide">create beautiful cards</div>
```
Sailnote listens to mousescrolls, up/down key presses, and touch to navigate slides.


# Usage
Have 'sn-slide' as a class on elements, and sailnote with turn them into full page slides.

To then initialize, simply do:
```javascript
  Sailnote.init();
```

To be able to do certain things to a slide when it is scrolled to, put an sn-id attribute on the element:
```html
  <div class="sn-slide" sn-id="example-fade-in">minimalist</div>
```

and listen for the 'enter' event, like so:
```javascript
  Sailnote.on('enter', 'example-fade-in', function(slide){
    // hide slide so we can fade it back in
    slide.css('opacity', 0);
    
    slide.fadeIn(1000);
  });
```
the function will receive the element with the sn-id "example-fade-in" as an argument.

You can also listen for the 'leave' event.

# API

There are two simple methods exposed if you want to use javascript to navigate slides.

to go to next:
```javascript
  Sailnote.next();
```


to go back:
```javascript
  Sailnote.back();
```
