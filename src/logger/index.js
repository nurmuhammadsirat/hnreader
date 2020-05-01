function info(msg, obj = undefined) {
  if(typeof(obj) === "undefined") {
    console.log(`${msg}`);
  }
  else {
    console.log(`${msg}`, obj);
  }

}

function error(msg, obj = undefined) {
  if(typeof(obj) === "undefined") {
    console.error(`${msg}`);
  }
  else {
    console.error(`${msg}`, obj);
  }
}

export default {
  info,
  error
}