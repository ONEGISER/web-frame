import "./style/index.css";
const welcome = function (str) {
    document.getElementById("root").innerHTML = str ? str : "欢迎使用js框架！"
}

export default welcome
