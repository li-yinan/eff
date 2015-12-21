/**
 * Functor类型类
 * 
 * @author liyinan
 * @version 1.0
 * @date 2015-12-20
 */

define(function (require) {

    /**
     * 标准的函数式编程Functor类型类
     * 不可调用，只可继承
     * Functor代表可映射类
     *
     * @param {*} data 数据
     *
     */
    function Functor(data) {
        if (!(this instanceof Functor)) {
            return new Functor(data);
        }
        this.data = data;
    }

    /**
     * 获取Functor类型类实例的数据
     *
     * @return {*}
     */
    Functor.prototype.getData = function () {
        return this.data;
    };

    /**
     * Functor的标准实现
     *
     * @param {function} func 需要应用的函数
     * @param {Functor} functorObj Functor的实例
     *
     * @return 
     */
    Functor.prototype.fmap = function (func, functorObj) {
        throw ('please implement fmap');
    };

    /**
     * Functor的fmap方法，函数式编程的标准模型
     * fmap会调用functorObj的fmap方法
     * 不同类型的数据自己实现fmap，解决了弱类型无法匹配类型的问题
     *
     * @param {function} func 需要应用的函数
     * @param {Functor} functorObj Functor的实例
     *
     * @return {Functor}
     */
    function fmap(func, functorObj) {
        if (!(functorObj instanceof Functor)) {
            throw ('param is not a Functor');
        }
        return functorObj.fmap(func);
    }

    return {
        Functor: Functor,
        fmap: fmap
    }
});
