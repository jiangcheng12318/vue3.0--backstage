/**
 * 环境配置文件
 * 在企业级项目中一般有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */
//当前环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development:{
        baseApi:'/api',
        mockApi: 'https://www.fastmock.site/mock/975522ea98192efe06e824f385dbbd22/tableData',
    },
    test:{
        baseApi:'/api',
        mockApi: 'https://www.fastmock.site/mock/975522ea98192efe06e824f385dbbd22/tabelData',
    },
    prod:{
        baseApi:'/api',
        mockApi: 'https://www.fastmock.site/mock/975522ea98192efe06e824f385dbbd22/tabelData',
    },

}

export default {
    env,
    //mock的总开关
    mock: true,
    ...EnvConfig[env]//spread语法返回了一个可迭代对象
}