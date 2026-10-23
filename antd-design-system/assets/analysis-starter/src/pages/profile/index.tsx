import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import type { DescriptionsProps } from "antd";
import { Badge, Card, Descriptions, Divider, Table } from "antd";
import type { FC } from "react";
import React from "react";
import type { BasicGood, BasicProgress } from "./data.d";

const progressColumns: ProColumns<BasicProgress>[] = [
  {
    title: "时间",
    dataIndex: "time",
  },
  {
    title: "当前进度",
    dataIndex: "rate",
  },
  {
    title: "状态",
    dataIndex: "status",
    render: (text: React.ReactNode) => {
      if (text === "success") {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="processing" text="进行中" />;
    },
  },
  {
    title: "操作员ID",
    dataIndex: "operator",
  },
  {
    title: "耗时",
    dataIndex: "cost",
  },
];
const goodsColumns: ProColumns<BasicGood>[] = [
  {
    title: "商品编号",
    dataIndex: "id",
  },
  {
    title: "商品名称",
    dataIndex: "name",
  },
  {
    title: "商品条码",
    dataIndex: "barcode",
  },
  {
    title: "单价",
    dataIndex: "price",
  },
  {
    title: "数量（件）",
    dataIndex: "num",
    align: "right",
  },
  {
    title: "金额",
    dataIndex: "amount",
    align: "right",
  },
];

const Descriptions1: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "取货单号",
    children: "1000000000",
  },
  {
    key: "2",
    label: "状态",
    children: "已取货",
  },
  {
    key: "3",
    label: "销售单号",
    children: "1234123421",
  },
  {
    key: "4",
    label: "子订单",
    children: "3214321432",
  },
];
const Descriptions2: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "用户姓名",
    children: "付小小",
  },
  {
    key: "2",
    label: "联系电话",
    children: "18100000000",
  },
  {
    key: "3",
    label: "常用快递",
    children: "菜鸟仓储",
  },
  {
    key: "4",
    label: "取货地址",
    children: "浙江省杭州市西湖区万塘路18号",
  },
  {
    key: "5",
    label: "备注",
    children: "无",
  },
];

const basicGoods = [
  {
    id: "1234561",
    name: "矿泉水 550ml",
    barcode: "12421432143214321",
    price: "2.00",
    num: "1",
    amount: "2.00",
  },
  {
    id: "1234562",
    name: "凉茶 300ml",
    barcode: "12421432143214322",
    price: "3.00",
    num: "2",
    amount: "6.00",
  },
  {
    id: "1234563",
    name: "好吃的薯片",
    barcode: "12421432143214323",
    price: "7.00",
    num: "4",
    amount: "28.00",
  },
  {
    id: "1234564",
    name: "特别好吃的蛋卷",
    barcode: "12421432143214324",
    price: "8.50",
    num: "3",
    amount: "25.50",
  },
];

const basicProgress = [
  {
    key: "1",
    time: "2017-10-01 14:10",
    rate: "联系客户",
    status: "processing",
    operator: "取货员 ID1234",
    cost: "5mins",
  },
  {
    key: "2",
    time: "2017-10-01 14:05",
    rate: "取货员出发",
    status: "success",
    operator: "取货员 ID1234",
    cost: "1h",
  },
  {
    key: "3",
    time: "2017-10-01 13:05",
    rate: "取货员接单",
    status: "success",
    operator: "取货员 ID1234",
    cost: "5mins",
  },
  {
    key: "4",
    time: "2017-10-01 13:00",
    rate: "申请审批通过",
    status: "success",
    operator: "系统",
    cost: "1h",
  },
  {
    key: "5",
    time: "2017-10-01 12:00",
    rate: "发起退货申请",
    status: "success",
    operator: "用户",
    cost: "5mins",
  },
];

const Basic: FC = () => {
  const loading = false;
  return (
    <PageContainer>
      <Card variant="borderless" className="basic-profile">
        <Descriptions title="退款申请" items={Descriptions1} />
        <Divider size="large" />
        <Descriptions title="用户信息" items={Descriptions2} />
        <Divider size="large" />
        <ProTable

          headerTitle="退货商品"
          style={{
            marginBottom: 24,
          }}
          pagination={false}
          search={false}
          loading={loading}
          options={false}
          dataSource={basicGoods}
          ghost
          columns={goodsColumns}
          rowKey="id"
          summary={(pageData) => {
            let totalNum = 0;
            let totalAmount = 0;
            pageData.forEach(({ num, amount }) => {
              totalNum += Number(num);
              totalAmount += Number(amount);
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <span style={{ fontWeight: 600 }}>总计</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">
                  <span style={{ fontWeight: 600 }}>{totalNum}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">
                  <span style={{ fontWeight: 600 }}>{totalAmount}</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
        <ProTable

          headerTitle="退货进度"
          pagination={false}
          loading={loading}
          search={false}
          options={false}
          ghost
          dataSource={basicProgress}
          rowKey="key"
          columns={progressColumns}
        />
      </Card>
    </PageContainer>
  );
};
export default Basic;
