//用户名正则，4到16位（字母，数字，下划线，减号）
export const userNameReg = (value: string) => {
    var pattern = /^[a-zA-Z0-9_-]{4,16}$/;
    //输出 true
    // console.log(pattern.test("iFat3"));
    return pattern.test(value)
}

//密码正则，至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符：
export const passwordReg = (value: string) => {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
    return pattern.test(value)
}