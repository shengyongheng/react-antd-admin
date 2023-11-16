// import '@babel/polyfill'
// 由于引入了大量的polyfill，导致我们原先仅仅只有几k的文件，膨胀到了511k, 因为引入的polyfill囊括了所有的兼容性处理，

import css from "./index.css"
import scss from "./index.scss"

const str = 'hello';

console.log(str.repeat(3), 'es6');

console.log(css, 'css-样式');
console.log(scss, 'scss-样式');

const arrowFn = () => {
    console.log('箭头函数');
}

new Promise(() => {
    console.log("Promise");
})

console.log(arrowFn);
