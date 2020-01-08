/*
 * @Descripttion: 
 * @Author: tom-z(spirit108@foxmail.com)
 * @Date: 2020-01-08 20:18:22
 * @LastEditors  : tom-z(spirit108@foxmail.com)
 * @LastEditTime : 2020-01-08 20:20:08
 */
function greeter(person) {
  return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);