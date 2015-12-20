/**
 * util
 * 
 * @author liyinan
 * @version 1.0
 * @date 2015-12-20
 */

define(function (require) {
    /**
     * 一个短小精悍的继承
     *
     * @param subClass 子类
     * @param parentClass 父类
     *
     * @return {function} 子类
     */
    function inherit(subClass, parentClass) {
        var tempClass = function () {
        };
        tempClass.prototype = parentClass.prototype;
        var subProto = subClass.prototype;

        subClass.prototype = new tempClass();
        for (var key in subProto) {
            if (subProto.hasOwnProperty(key)) {
                subClass.prototype[key] = subProto[key];
            }
        }
        return subClass;
    };

    /**
     * 柯里化，一个参数
     *
     * @param {function} func 函数
     *
     * @return {function}
     */
    function curry1(func) {
        return function (arg1) {
            return func.call(this, arg1);
        }
    }

    /**
     * 柯里化，两个参数
     *
     * @param {function} func 函数
     *
     * @return {function}
     */
    function curry2(func) {
        return function (arg2) {
            return function (arg1) {
                return func.call(this, arg1, arg2);
            }
        }
    }

    /**
     * 柯里化，三个参数
     *
     * @param {function} func 函数
     *
     * @return {function}
     */
    function curry3(func) {
        return function (arg3) {
            return function (arg2) {
                return function (arg1) {
                    return func.call(this, arg1, arg2, arg3);
                }
            }
        }
    }

    return {
        inherit: inherit,
        curry1: curry1,
        curry2: curry2,
        curry3: curry3
    };
});
