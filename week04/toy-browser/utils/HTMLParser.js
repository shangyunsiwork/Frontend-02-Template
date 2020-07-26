const EOF = Symbol('EOF');

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [{type:'document',children:[]}];

function emit (token){
  let top = stack[stack.length - 1];
  if(token.type === 'startTag'){
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    };
    element.tagName = token.tagName;

    for(let p in token){
      if(p.type !== 'type' && p !== 'tagName'){
         element.attributes.push({
           name:p,
           value:token[p]
         })       
      }
    }
    top.children.push(element);
    element.parent = top;

    if(!token.isSelfClosing){
      stack.push(element);
    }

    currentTextNode = null;
  } else if(token.type === 'endTag'){
    if(top.tagName !== token.tagName){
      throw new Error('tag name not match')
    }else{
      stack.pop();
    }
    currentTextNode = null;
  } else if(token.type === 'text'){
    if(currentTextNode === null){
      currentTextNode = {
        type:'text',
        value:''
      }
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}
const data = (c) => {
  if(c === '<'){
    return tagOpen;
  } else if(c === EOF){
    emit({
      type:'EOF'
    })
    return ;
  }else{
    emit({
      type:'text',
      content: c,
    })
    return data;
  }
}

const tagOpen = (c)=>{
  if(c === '/'){
    return endTagOpen;
  } else if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type: 'startTag',
      tagName: '',
    }
    return tagName(c);
  } else{
    return ;
  }
}

const endTagOpen = (c) => {
  if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type:'endTag',
      tagName: '',
    }
    return tagName(c);
  } else if(c === '>'){

  } else if(c === EOF){

  } else {

  }
}

const tagName = (c)=>{
  if(c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName;
  }else if(c === '/'){
    return selfClosingStartTag;
  } else if(c.match(/^[a-zA-Z]$/)){
    currentToken.tagName += c;
    return tagName;
  } else if(c === '>'){
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

const beforeAttributeName = (c)=>{
  if(c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName;
  } else if(c === '/' || c === '>' || c === EOF){
    return afterAttributeName(c);
  } else if(c === '='){
    return beforeAttributeName;
  }else {
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName(c);
  }
}

const afterAttributeName = (c)=>{
  if(c.match(/^[\t\n\f ]$/)){
    return attributeName;
  }else if(c === '/'){
    return selfClosingStartTag;
  }else if(c === '='){
    return beforeAttributeValue;
  } else if(c === '>'){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }else if(c === EOF){

  }else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name:'',
      value:''
    }
    return attributeName(c);
  }
}

const attributeName = (c)=>{
  if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF){
    return afterAttributeName(c);
  }else if(c === '='){
    return beforeAttributeValue;
  }else if(c==='\u0000'){

  }else if(c === '\"' || c ==="'" || c === "<"){

  }else{
    currentAttribute.name += c;
    return attributeName;
  }
}

const beforeAttributeValue = (c)=>{
  if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF){
    return beforeAttributeValue;
  } else if(c === "\""){
    return doubleQuoteAttributeValue;
  } else if(c === "'"){
    return singleQuoteAttributeValue;
  } else if(c === '>'){

  }else{
    return unquotedAttributeValue;
  }
}

const doubleQuoteAttributeValue = (c)=>{
  if(c === "\""){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c === '\u0000'){

  } else if(c === EOF){

  } else {
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}

const singleQuoteAttributeValue = (c)=>{
  if(c === "'"){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if(c === '\u0000'){

  } else if(c === EOF){

  } else {
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}

const afterQuotedAttributeValue = (c)=>{
  if(c.match(/^[\t\n\f ]$/)){
    return attributeName;
  }else if(c === '/'){
    return selfClosingStartTag;
  } else if(c === '>'){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  }else if(c === EOF){

  }else{
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}
const unquotedAttributeValue = (c)=>{
  if(c.match(/^[\t\n\f ]$/)){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  }  else if(c === '/'){
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if( c === '>'){
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if(c === '\u0000'){

  } else if(c === '"' || c === "'" || c === '<' || c === '=' || c === '`'){
  } else if(c === 'EOF'){

  } else {
    currentAttribute.value += c;
    return unquotedAttributeValue;
  }
}

const selfClosingStartTag = (c) => {
  if(c === '>'){
    currentToken.isSelfClosing = true;
    return data;
  } else if( c === 'EOF'){

  } else{

  }
}

const parseHTML = (html)=>{
  let state = data;
  for(let c of html){
    console.log(c);
    state = state(c);
  }
  state = state(EOF);
}
module.exports = {
  parseHTML
}