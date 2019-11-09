// 微信用户列表
<template>
    <div class="user-list">
        <div class="filter-box">
            <div class="filter-area">
                <div class="item-filter-area">
                    <span class="filter-title">选项：</span>
                    <a-select class="input-small" defaultValue="lucy" @change="handleChange">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </div>
                <div class="item-filter-area">
                    <span class="filter-title">月份：</span>
                    <a-month-picker class="input-small" @change="onChange" placeholder="请选择月份" />
                </div>
                <div class="item-filter-area">
                    <a-input-search class="input-small" placeholder="请输入关键词" @search="onSearch" enterButton />
                </div>
            </div>
            <div class="to-filter-btn">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left:20px" type="primary">重置</a-button>
            </div>
        </div>
        <div class="table-box">
            <a-table :columns="columns" :dataSource="data" bordered>
                <template slot="avatar" slot-scope="text">
                    <a-avatar :size="30" icon="user" :src="text" />
                </template>
                <template slot="name" slot-scope="text">
                    <a href="javascript:;">{{text}}</a>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
    const columns = [
        {
        title: 'Avatar',
        dataIndex: 'avatar',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'avatar' },
        },
        {
        title: 'Name',
        dataIndex: 'name',
        scopedSlots: { customRender: 'name' },
        },
        {
        title: 'Cash Assets',
        className: 'column-money',
        dataIndex: 'money',
        },
        {
        title: 'Address',
        dataIndex: 'address',
        },
    ];
    const data = [
        {
        key: '1',
        avatar: '',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
        },
        {
        key: '2',
        avatar: '',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
        },
        {
        key: '3',
        avatar: '',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        },
        {
        key: '4',
        avatar: '',
        name: 'Joe Black-1',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        },
        {
        key: '5',
        avatar: '',
        name: 'Joe Black-2',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        },
        {
        key: '6',
        avatar: '',
        name: 'Joe Black-3',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        },
        {
        key: '7',
        avatar: '',
        name: 'Joe Black-4',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        },
        {
        key: '8',
        avatar: '',
        name: 'Joe Black-5',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        },
        {
        key: '9',
        avatar: '',
        name: 'Joe Black-6',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        },
        {
        key: '10',
        avatar: '',
        name: 'Joe Black-7',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
        }
    ];


export default {
    data() {
        return {
            data,
            columns
        }
    },
    methods: {
      handleChange(value) {
        console.log(`selected ${value}`);
      },
      onChange(date, dateString) {
        console.log(date, dateString);
      },
      onSearch(value) {
        console.log(value);
      }
    }
}
</script>

<style lang="less" scoped>
    .table-box {
        margin-top: 20px;
        background-color: @def-color;
    }
</style>