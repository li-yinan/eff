/**
 * 函数式编程框架
 * 
 * @author liyinan
 * @version 1.0
 * @date 2015-12-20
 */
define(function (require) {
    var Functor = require('./Functor');
    var Monad = require('./Monad');
    var Either = require('./Either');
    var util = require('./util');
    return {
        Functor: Functor,
        Monad: Monad,
        Either: Either,
        util: util
    }
});
