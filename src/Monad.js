/**
 * Monad 类型类的实现，用于取一个包装值，对其内部值进行运算，返回一个包装值
 * 
 * @author liyinan
 * @version 1.0
 * @date 2015-12-20
 */
define(function (require) {

    var Functor = require('./Functor').Functor;
    var util = require('./util');

    /**
     * 函数式编程的Monad类型类
     * Monad类型类用于接受一个包装值，取出内部值进行运算，返回一个包装值
     *
     * 如Right(1) >>= \x->Right(x+1)，返回Right(2); // 此例为haskell语法
     * js的例子大概是这样：
     * function add1(monadValue) {
     *     var data = monadValue.getData();
     *     return Right(data+1);
     * }
     * add1(Right(1));
     *
     * 返回Right(2);
     * 其中Right(1) 为对1的包装值，内部值为1，运算后返回包装值Right(2)
     *
     * 虽然在haskell里Monad没有继承Functor
     * 但实际上大多数的Monad表现为Functor的实例
     * 因此这里实现的Monad继承于Functor
     *
     */
    function Monad() {
        if (!(this instanceof Monad)) {
            return new Monad(data);
        }
        Functor.apply(this, arguments);
    }

    /**
     * Monad类型类的>>=方法实现
     * 本来是叫apply的，但是apply容易误解为function的apply，该为mApply了
     *
     * @param {function} func 需要应用的函数
     * @param {Monad} monadObj Monad的实例
     *
     * @return {Monad}
     */
    Monad.prototype.mApply = function (func, monadObj) {
        throw ('please implement mApply');
    };

    util.inherit(Monad, Functor);

    /**
     * Monad >>=方法的实现
     *
     * @param {function} func 需要应用的函数
     * @param {Monad} monadObj Monad的实例
     *
     * @return {Monad}
     */
    function mApply(func, monadObj) {
        if (!(monadObj instanceof Monad)) {
            throw ('param is not a monad');
        }
        var data = monadObj.getData();
        return monadObj.mApply(func);
    }

    /**
     * Monad类型类的do记法实现
     * 用来做数据流编程
     *
     * @param {Monad} seed 初始值
     *
     * @return {Monad}
     */
    function flow(seed) {
        // 第一个参数是初始值，后面的是monad方法
        var funcs = ([]).slice.call(arguments, 0);
        funcs.shift();
        for (var i = 0; i < funcs.length; i++) {
            seed = mApply(funcs[i], seed);
        }
        return seed;
    }

    return {
        Monad: Monad,
        mApply: mApply,
        flow: flow 
    };
});
