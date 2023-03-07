//先引入mockjs模块
import Mock from 'mockjs'
//把json数据格式引入进来
import banner from './banner'
import floor from './floor'

Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })
