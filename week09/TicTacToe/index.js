let pattern = [
  0, 0, 0,
  0, 1, 0,
  0, 0, 0
];

let color = 2;

function userMove(x,y){
  pattern[y * 3 + x] = color;
  if(check(pattern, color)){
    alert(color === 2 ? '❌ is winner' : '⭕️ is winner');
  }
  color = 3 - color;
  show();
  computerMove();
}

function clone (pattern){
  return Object.create(pattern);
}

function willwin(pattern, color){
  for(let i = 0;i < 3; i ++){
    for(let j = 0;j < 3; j ++){
      if(pattern[i * 3 + j] !== 0){
        continue;
      }

      let tmp = clone(pattern);
      tmp[i * 3 +  j] = color;
      if(check(tmp, color)){
        return [j,i];
      }
    }
  }
  return null;
}

function computerMove(){
  let choice = bestChoice(pattern, color);
  if(choice.point){
    pattern[choice.point[1] * 3 + choice.point[0]] = color;
  }
  if(check(pattern,color)){
    alert(color === 2 ? '❌ is winner' : '⭕️ is winner');
  }
  color = 3 - color;
  show();
}

function bestChoice(pattern, color){
  let point = willwin(pattern, color);
  if(point){
    return {
      point,
      result: 1
    };
  }
  let result = -1;
  outer: for(let i = 0;i < 3; i ++){
    for(let j = 0;j < 3; j ++){
      if(pattern[i * 3 + j] !== 0){
        continue;
      }
      let tmp = clone(pattern);
      tmp[i * 3 + j] = color;
      let app = bestChoice(tmp, 3 - color);
      if(-app.result >= result){
        result = -app.result;
        point = [j, i]
      }
      if(result == 1){
        break outer;
      }
    }
  }

  return {
    point : point,
    result: point ? result : 0,
  }
}

function check(pattern, color){
  {
    for(let i = 0;i < 3; i ++){
      let win =  true;
      for(let j = 0; j < 3; j ++ ){
        if(pattern[i * 3 + j] !== color){
          win = false;
        }
      }
      if(win) return true;
    }
  }

  {
    for(let i = 0;i < 3; i ++){
      let win =  true;
      for(let j = 0; j < 3; j ++ ){
        if(pattern[i + j * 3] !== color){
          win = false;
        }
      }
      if(win) return true;
    }
  }

  {
    let win = true;
    for(let j = 0; j < 3; j ++){
      if(pattern[j * 3 + 2 - j] !== color){
        win = false;
      }
    }
    if(win) return true;
  }

  {
    let win = true;
    for(let j = 0; j < 3; j ++){
      if(pattern[j * 3 + j] !== color){
        win = false;
      }
    }
    if(win) return true;
  }

  return false;
}

function show(){
  let board = document.getElementById('board');
  board.innerHTML = '';

  let fragment = document.createDocumentFragment();
  for(let i = 0;i < 3; i ++){
    for(let j = 0; j < 3 ; j++){
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = pattern[i * 3 + j] === 2 ? '❌' 
        : pattern[i * 3 + j] === 1 ? '⭕️' : '';
      cell.addEventListener('click', () => userMove(j, i))
      fragment.appendChild(cell);
    }
    fragment.appendChild(document.createElement('br'));
  }
  board.appendChild(fragment);
}
show();