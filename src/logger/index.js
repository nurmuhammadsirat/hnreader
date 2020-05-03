function info(msg, obj = undefined) {
  if(typeof(obj) === "undefined") {
    console.log(`INFO: ${msg}`);
  }
  else {
    console.log(`INFO: ${msg}`, obj);
  }

}

function debug(msg, obj = undefined) {
  if (typeof(process.env.REACT_APP_DEBUG) !== "undefined" && process.env.REACT_APP_DEBUG.toLowerCase() === "true") {
    if(typeof(obj) === "undefined") {
      console.log(`DEBUG: ${msg}`);
    }
    else {
      console.log(`DEBUG: ${msg}`, obj);
    }
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
  debug,
  error
}