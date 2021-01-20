
function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid'); // удаляет все куки с именем 'user_sid' - имя задано произвольно
  }
  next();
}
// создаем функцию, которая проверяет существует ли сессия, если она не существует, то она делает редирект на личный кабинет
function sessionChecker(req, res, next) {
  if (req.session.user) {
    res.redirect('/articles'); // адрес личного кабинета
  } else {
    next();
  }
};

module.exports = {cookiesCleaner, sessionChecker}
