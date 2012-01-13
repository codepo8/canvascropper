
var tothecroppa = function() {
  var c = document.createElement( 'canvas' ),
      cx = c.getContext( '2d' ),
      img = null,
      mousedown = false,
      done = false,
      ic = {};
  var menu = '<menu type="context" id="croppamenu">'+
             '<menuitem label="crop" id="croppaitem" '+
             ' onclick="tothecroppa.initcrop()">'+
             '</menuitem></menu>';
  document.body.innerHTML += menu;
  c.style.display = 'block';
  c.style.position = 'absolute';
  c.style.left = '-20000px';
  c.style.top = 0;
  document.body.appendChild( c );
  document.body.setAttribute( 'contextmenu', 'croppamenu' );
  document.body.addEventListener( 'contextmenu', function( ev ) {
    if ( ev.target.tagName === 'IMG' ) {
      document.querySelector('#croppaitem').disabled = false;
      img = ev.target;
      ic = {
        left: img.offsetLeft,
        top: img.offsetTop,
        width: img.offsetWidth,
        height: img.offsetHeight
      }
    } else {
      document.querySelector('#croppaitem').disabled = true;
    }
  }, false);
  
  c.addEventListener( 'mousemove', function( ev ) {
    if ( mousedown && !done ) {
      var mouse = [ ev.clientX - ic.left , ev.clientY - ic.top ];
      cx.drawImage( img, 0, 0 );
      cx.fillStyle = 'rgba( 0,0,0,0.8)';
      rect = { 
        x: startx,
        y: starty,
        x1: mouse[0] - startx,
        y1: mouse[1] - starty
     };
     cx.fillRect( 0, 0, rect.x, ic.height );
     cx.fillRect( rect.x + rect.x1, 0, ic.width - rect.x1, ic.height );
     cx.fillRect( rect.x, 0, rect.x1, rect.y );
     cx.fillRect( rect.x, rect.y+rect.y1, rect.x1, ic.height - rect.y1 );
   }
  }, false );
  
   c.addEventListener ( 'keydown', function( ev ) {
     if ( ev.keyCode === 13 ) {
       crop();
     }
   }, false );
   c.addEventListener( 'mousedown', function( ev ) {
     if ( !done ) {
       mousedown = true;
       startx = ( ev.clientX - ic.left );
       starty = ( ev.clientY - ic.top );
     }
   },false);
   c.addEventListener( 'dblclick', function( ev ) {
     crop();
  });
  
   c.addEventListener( 'mouseup', function( ev ) {
     mousedown = false;
   }, false );
  function crop() {
    done = true;
    c.width = rect.x1;
    c.height = rect.y1;
    cx.drawImage( 
      img, rect.x, rect.y, rect.x1, rect.y1, 0, 0, rect.x1, rect.y1 
    );
  }
  function initcrop(){
    c.width = ic.width;
    c.height = ic.height;
    c.style.position = 'absolute';
    c.style.top = ic.top + 'px';
    c.style.left = ic.left + 'px';
    img.style.visibility = 'hidden';
    cx.drawImage( img, 0 ,0);
    cx.fillStyle = 'rgba( 0,0,0,0.4)';
    cx.fillRect( 0, 0, ic.width, ic.height );
  };
  return {initcrop:initcrop};
}();
