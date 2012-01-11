document.addEventListener( 'click', function( ev ) {
  var mousedown = false,
      done = false,
      rect = {},
      startx = false, 
      starty = false,
      endx = false,
      endy = false,
      width = 0,
      height = 0,
      tx = 0,
      ty = 0,
      img = null;
  var t = ev.target;
  if ( t.tagName === 'IMG' ) {
     var c = document.createElement( 'canvas' ),
     cx = c.getContext( '2d' );
     height = t.offsetHeight;
     width = t.offsetWidth;
     tx = t.offsetLeft;
     ty = t.offsetTop;
     c.width = width;
     c.height = height;
     c.style.top = t.offsetTop + 'px';
     c.style.left = t.offsetLeft + 'px';
     t.parentNode.replaceChild( c, t );
     t.style.display = 'none';
     cx.drawImage( t, 0, 0 );
     c.addEventListener( 'mousemove', function( ev ) {
       if ( mousedown && !done ) {
         var mouse = [ ev.clientX - tx , ev.clientY - ty ];
         cx.drawImage( t, 0, 0 );
         cx.fillStyle = 'rgba( 0,0,0,0.8)';
         rect = { 
           x: startx,
           y: starty,
           x1: mouse[0] - startx,
           y1: mouse[1] - starty
        };
        cx.fillRect( 0, 0, rect.x, height );
        cx.fillRect( rect.x + rect.x1, 0, width-rect.x1, height );
        cx.fillRect( rect.x, 0, rect.x1, rect.y );
        cx.fillRect( rect.x, rect.y+rect.y1, rect.x1, height-rect.y1 );
      }
     }, false );
     c.tabIndex = -1;
     c.focus();
     c.addEventListener ( 'keydown', function( ev ) {
       if ( ev.keyCode === 13 ) {
         crop();
       }
       if ( ev.keyCode === 90 ) {
         c.height = height;
         c.width = width;
         done = false;
         mousedown = false;
         rect = {};
         startx = false; 
         starty = false;
         endx = false;
         endy = false;
         cx.drawImage( t, 0, 0 );
       }
     }, false );
     c.addEventListener( 'mousedown', function( ev ) {
       if ( !done ) {
         mousedown = true;
         startx = ( ev.clientX - tx );
         starty = ( ev.clientY - ty );
       }
     },false);
     c.addEventListener( 'dblclick', function( ev ) {
       crop();
    });
    
     c.addEventListener( 'mouseup', function( ev ) {
       mousedown = false;
     }, false );
  };
  function crop() {
    done = true;
    c.width = rect.x1;
    c.height = rect.y1;
    cx.drawImage( 
      t, rect.x, rect.y, rect.x1, rect.y1, 0, 0, rect.x1, rect.y1 
    );
    img = document.createElement( 'img' );
    img.src = c.toDataURL( 'image/png' );
    c.parentNode.appendChild( img );
    c.style.display = 'none'; 
  }
  ev.preventDefault();
}, false );