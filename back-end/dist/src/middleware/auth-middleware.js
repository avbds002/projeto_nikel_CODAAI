import repository from "../database/repository.js";
async function auth(req, res, next) {
  const { user, password } = req.headers;
  if (user && password) {
    const userLogged = await repository.user.findUnique({
      //dessa forma ele irá receber String ao invés de undefined
      where: { login: `${user}`, password: `${password}` },
    });
    if (userLogged) {
      return next();
    }
  }
  return res
    .status(401)
    .json({ success: false, msg: "Usuário não está logado" });
}
export default auth;
//# sourceMappingURL=auth-middleware.js.map
