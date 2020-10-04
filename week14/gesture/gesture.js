let element = document.documentElement;


let isListeningMouse = false;
/**
 * 鼠标
 */
element.addEventListener('mousedown', event => {
  let context = Object.create(null);
  contexts.set('mouse' + (1 << event.button), context);

  start(event, context);

  let mousemove = event => {
    let button = 1;
    
    while(button <= event.buttons){
      if(button & event.buttons){
        let key;
        if(button === 2){
          key = 4;
        } else if(button === 4){
          key = 2;
        } else {
          key = button;
        }

        let context = contexts.get('mouse' + key);
        move(event, context);
      }
      button = button << 1;
    }
  }

  let mouseup = event => {
    let context = contexts.get('mouse' + (1 << event.button));
    
    end(event, context);
    contexts.delete('mouse' + (1 << event.button));

    if(event.buttons === 0){
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      isListeningMouse = false ;
    }
  }

  if(!isListeningMouse){
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    isListeningMouse = true;
  }
})


let contexts = new Map();
/** 
 * 触摸屏
 */
element.addEventListener('touchstart', event => {
  for(let touch of event.changedTouches){
    let context = Object.create(null);
    contexts.set(touch.identifier, context);
    start(touch, context);
  }
})

element.addEventListener('touchmove', event => {
  for(let touch of event.changedTouches){
    let context = contexts.get(touch.identifier, context);
    move(touch, context);
  }
})

element.addEventListener('touchend', event => {
  for(let touch of event.changedTouches){
    let context = contexts.get(touch.identifier, context);
    end(touch, context);
    contexts.delete(touch.identifier);
  }
})

element.addEventListener('touchcancel', event => {
  for(let touch of event.changedTouches){
    let context = contexts.get(touch.identifier, context);
    cancel(touch, context);
    contexts.delete(touch.identifier);
  }
})

let timer;
let startX, startY;
let isPan;
let isTap;
let isPress;

let start = (point, context) => {
  context.startX = point.clientX, context.startY = point.clientY;

  context.isTap = true;
  context.isPan = false;
  context.isPress = false;

  context.points = [
    {
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    }
  ]
  // 
  context.timer = setTimeout(() => {
    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    context.timer = null;
    console.log('pressstart');
  }, 500);

}

let move = (point, context) => {
  let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
  if(!context.isPan && dx ** 2 + dy ** 2 > 100){
    context.isPan = true;
    context.isTap = false;
    context.isPress = false;
    clearTimeout(context.timer);
  }

  if(context.isPan){
    console.log('panstart')
  }
  context.points = context.points.filter(point => Date.now() - point.t < 500);

  context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
  });
}

let end = (point, context) => {
  if(context.isTap){
    console.log('tap')
    dispatchEvent('tap', {});
    clearTimeout(context.timer);
  }

  if(context.isPan){
    console.log('pan')
  }

  if(context.isPress){
    console.log('press')
  }

  let d, v;
  if(!context.points.length){
    v = 0;
  } else {
    d = Math.sqrt((point.clientX - context.points[0].x) ** 2
    + (point.clientY - context.points[0].y) ** 2);
    v = d / (Date.now() - context.points[0].t);
  }

  if(v < 1.5){
    context.isFlick = false;
  } else {
    context.isFlick = true;
  }
}

let cancel = (point, context) => {
  clearTimeout(context.timer);
}

function dispatchEvent(type, properties){
  let event = new Event(type);
  for(let name in properties){
    event[name] = properties[name];
  }
  element.dispatchEvent(event);
}