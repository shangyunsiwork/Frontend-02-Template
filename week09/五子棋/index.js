let pattern = [
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
];

let flag = 5;
let color = 2;

function userMove(x,y){
  pattern[y * flag + x] = color;
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
  for(let i = 0;i < flag; i ++){
    for(let j = 0;j < flag; j ++){
      if(pattern[i * flag + j] !== 0){
        continue;
      }

      let tmp = clone(pattern);
      tmp[i * flag +  j] = color;
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
    pattern[choice.point[1] * flag + choice.point[0]] = color;
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
  outer: for(let i = 0;i < flag; i ++){
    for(let j = 0;j < flag; j ++){
      if(pattern[i * flag + j] !== 0){
        continue;
      }
      let tmp = clone(pattern);
      tmp[i * flag + j] = color;
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
    for(let i = 0;i < flag; i ++){
      let win =  true;
      for(let j = 0; j < flag; j ++ ){
        if(pattern[i * flag + j] !== color){
          win = false;
        }
      }
      if(win) return true;
    }
  }

  {
    for(let i = 0;i < flag; i ++){
      let win =  true;
      for(let j = 0; j < flag; j ++ ){
        if(pattern[i + j * flag] !== color){
          win = false;
        }
      }
      if(win) return true;
    }
  }

  {
    let win = true;
    for(let j = 0; j < flag; j ++){
      if(pattern[j * flag + 2 - j] !== color){
        win = false;
      }
    }
    if(win) return true;
  }

  {
    let win = true;
    for(let j = 0; j < flag; j ++){
      if(pattern[j * flag + j] !== color){
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
  for(let i = 0;i < flag; i ++){
    for(let j = 0; j < flag ; j++){
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = pattern[i * flag + j] === 2 ? '❌' 
        : pattern[i * flag + j] === 1 ? '⭕️' : '';
      cell.addEventListener('click', () => userMove(j, i))
      fragment.appendChild(cell);
    }
    fragment.appendChild(document.createElement('br'));
  }
  board.appendChild(fragment);
}
show();