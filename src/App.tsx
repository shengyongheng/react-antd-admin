import React, { useEffect } from 'react'
import { routes } from './router/routeLists'
import AppRouter from './router/AppRouter'
import AppRouter2 from './router/AppRouter2'
import { setStorage, getStorage } from './utils/storages'

function App(): React.JSX.Element {

  useEffect(() => {
    // 后端实现
    // window.onload = function () {
    //   let lastTime = getStorage("lastTime");
    //   const interval = 3 * 1000;
    //   // 如果没有上一次离开的时间或者时间间隔大于3s，就清除本地存储
    //   if (!lastTime || new Date().getTime() - lastTime > interval) {
    //     localStorage.clear();
    //   }
    // };

    // window.onunload = function () {
    //   setStorage("lastTime", new Date().getTime());
    // };

    /**
     * 浏览器监听中刷新和关闭事件有点类似：
       页面关闭时先执行onbeforeunload，然后onunload
       页面刷新时先执行onbeforeunload，然后onunload，最后onload。
     */

    // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //   /**
    //    * 在事件回调函数中调用 event.preventDefault() 来阻止浏览器默认的关闭行为，并返回一个空字符串 event.returnValue = ''。
    //    * 这是为了确保浏览器会显示一个确认对话框，询问用户是否确认离开页面，以防止误操作导致数据丢失。
    //    */
    //   // event.preventDefault();
    //   // event.returnValue = '';
    // }
  }, []);


  return (
    <div className='App'>
      <AppRouter routes={routes}></AppRouter>
      {/* <AppRouter2 /> */}
    </div>
  )
}

export default App
