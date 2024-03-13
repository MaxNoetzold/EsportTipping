function generateRandomString(length = 20) {
  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }

  return randomString;
}

export default generateRandomString;
