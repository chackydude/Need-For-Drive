export function init() {
  // Создание экземпляра карты.
  var myMap = new ymaps.Map(
    "map",
    {
      center: [50.443705, 30.530946],
      zoom: 14
    },
    {
      searchControlProvider: "yandex#search"
    }
  );

  function createSubMenu(item, collection, submenu) {
    // Пункт подменю.
    var submenuItem = $('<li><a href="#">' + item.name + "</a></li>"),
      // Создаем метку.
      placemark = new ymaps.Placemark(item.center, {
        balloonContent: item.name
      });

    // Добавляем метку в коллекцию.
    collection.add(placemark);
    // Добавляем пункт в подменю.
    submenuItem
      .appendTo(submenu)
      // При клике по пункту подменю открываем/закрываем баллун у метки.
      .find("a")
      .bind("click", function() {
        if (!placemark.balloon.isOpen()) {
          placemark.balloon.open();
        } else {
          placemark.balloon.close();
        }
        return false;
      });
  }

  // Добавляем меню в тэг BODY.
  menu.appendTo($("body"));
  // Выставляем масштаб карты чтобы были видны все группы.
  myMap.setBounds(myMap.geoObjects.getBounds());
}
