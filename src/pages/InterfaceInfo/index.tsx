import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceByGetUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/api-backend/interfaceInfoController';
import {
  getUserInterfaceInfoByIdUsingGET,
  updateUserInterfaceInfoUsingPOST,
} from '@/services/api-backend/userInterfaceInfoController';
import { useParams } from '@@/exports';
import { PlusSquareOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Form, Input, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [interfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfo>();
  const [userInterfaceInfo, setUserInterfaceInfo] = useState<API.UserInterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      const userInterfaceInfo = await getUserInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setInterfaceInfo(res.data);
      setUserInterfaceInfo(userInterfaceInfo.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    if (userInterfaceInfo?.leftNum === 0) {
      message.error('剩余调用次数不足');
      return;
    }
    setInvokeLoading(true);
    try {
      let res;
      if (interfaceInfo?.method) {
        const method = interfaceInfo.method.toLowerCase();
        if (method === 'post') {
          res = await invokeInterfaceInfoUsingPOST({
            id: params.id,
            ...values,
          });
        } else if (method === 'get') {
          res = await invokeInterfaceByGetUsingGET({
            id: params.id,
            ...values,
          });
        } else {
          message.error('请求方法错误');
        }
      } else {
        message.error('请求方法为空');
      }

      // @ts-ignore
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  const addInvokeCount = async () => {
    try {
      const res = await updateUserInterfaceInfoUsingPOST({
        id: userInterfaceInfo?.id,
        leftNum: userInterfaceInfo?.leftNum,
      });
      if (res) {
        message.success('购买成功');
        const newUserInterfaceInfo = await getUserInterfaceInfoByIdUsingGET({
          id: Number(params.id),
        });
        setUserInterfaceInfo(newUserInterfaceInfo.data);
      }
    } catch (error: any) {
      message.error('操作失败');
    }
  };

  return (
    <PageContainer title="查看接口文档">
      <Card>
        {interfaceInfo ? (
          <Descriptions title={interfaceInfo.name} column={1}>
            <Descriptions.Item label="接口状态">{interfaceInfo.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{interfaceInfo.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{interfaceInfo.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{interfaceInfo.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{interfaceInfo.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{interfaceInfo.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{interfaceInfo.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{interfaceInfo.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{interfaceInfo.updateTime}</Descriptions.Item>
            <Descriptions.Item label="已调用次数">{userInterfaceInfo?.totalNum}</Descriptions.Item>
            <Descriptions.Item
              label="剩余调用次数"
              labelStyle={{
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              <Space>
                <Button>{userInterfaceInfo?.leftNum}</Button>
                <Button icon={<PlusSquareOutlined />} onClick={addInvokeCount}>
                  购买调用次数（当前自动添加 10 次）
                </Button>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card title="在线调试">
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="requestParams">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
