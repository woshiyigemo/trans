// 基础货币类型
const currencyType = [
    'USDT',
    'CNY',
    'ETH',
    'UT',
    'BTC'
]
// 国际
const nationalityOption = [
    {
        label:'澳洲',
        value:2
    },
    {
        label:'中国',
        value:1
    }
]


const nationalityInfo = {
    1:{
        credentials:'身份证',
    },
    2:{
        credentials:'护照'
    }
}

export { currencyType, nationalityOption, nationalityInfo}