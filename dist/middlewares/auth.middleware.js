import { getResponsible } from '../repositories/auth.repository.js';
function validateToken(req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        return res.sendStatus(401);
    }
    var responsible = getResponsible(token);
    res.locals.responsible = responsible;
    next();
}
export { validateToken, };
