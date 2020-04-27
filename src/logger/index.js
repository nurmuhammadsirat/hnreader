function info(msg, obj = undefined) {
  console.log(`${msg}`, obj);
}

function error(msg, obj = undefined) {
  console.error(`${msg}`, obj);
}

export default {
  info,
  error
}