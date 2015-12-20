/**
 * Either类型类，用来表示互斥的数据结构
 * Either类型类包含两个类，Left、Right
 * 通常Left用来代表错误的数据，Right代表正确的数据
 * 用Either类包装函数返回值可以在不影响返回数据的情况下同时返回处理成功还是失败
 * 
 * @author liyinan
 * @version 1.0
 * @date 2015-12-20
 */

define(function (require) {

    var util = require('./util');

    var Functor = require('./Functor').Functor;
    var Monad = require('./Monad').Monad;

    /**
     * Either类型类,不可调用，只可继承
     *
     * @param {*} data 数据
     *
     * @inherit {Either}
     */
    function Either(data) {
        if (!(this instanceof Either)) {
            return new Either(data);
        }
        Functor.apply(this, arguments);
    }

    /**
     * Either类的Functor实现
     *
     * @param {function} func 需要应用的函数
     * @param {Either} Either Either的实例
     * @param {*} context 执行上下文
     * @override
     *
     * @return {Either}
     */
    Either.prototype.fmap = function (func, eitherObj, context) {
        if (eitherObj instanceof Left) {
            return eitherObj;
        }
        else if (eitherObj instanceof Right) {
            var data = eitherObj.getData();
            var result = func.call(context, data);
            return Right(result);
        }
        throw ('data is not a Either instance!');
    };

    util.inherit(Either, Functor);

    /**
     * Either类的Monad实现
     *
     * @param {function} func 需要应用的函数
     * @param {Either} Either Either的实例
     * @param {*} context 执行上下文
     * @override
     *
     * @return {Either}
     */
    Either.prototype.mApply = function (func, eitherObj, context) {
        if (eitherObj instanceof Left) {
            return eitherObj;
        }
        else if (eitherObj instanceof Right) {
            var data = eitherObj.getData();
            var result = func.call(context, data);
            if (!(result instanceof Either)) {
                throw ('return is not a Either Monad');
            }
            return result;
        }
        throw ('data is not a Either instance!');
    };

    util.inherit(Either, Monad);

    /**
     * Either的实例类，用来表示错误的值
     *
     * @param {*} data 数据
     *
     */
    function Left(data) {
        if (!(this instanceof Left)) {
            return new Left(data);
        }
        Either.apply(this, arguments);
    }

    util.inherit(Left, Either);

    /**
     * Either的实例类，用来表示正确的值
     *
     * @param {*} data 数据
     *
     */
    function Right(data) {
        if (!(this instanceof Right)) {
            return new Right(data);
        }
        Either.apply(this, arguments);
    }

    util.inherit(Right, Either);


    return {
        Either: Either,
        Left: Left,
        Right: Right
    };
});
