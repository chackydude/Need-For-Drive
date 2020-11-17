async function getCoordinates(address) {
  let response = await fetch(
      "https://geocode-maps.yandex.ru/1.x/?apikey=a71d7230-50f6-4491-969f-9813b527ea7a&format=json&geocode=" +
      address
  );
  if (response.ok) {
    let json = response.json();
    return json;
  }
  return undefined;
}

getCoordinates("Ульяновск");
