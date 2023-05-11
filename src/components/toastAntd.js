import { Button, notification, Space } from 'antd';
const Toast = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const message = props.message;
  const description = props.description;
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </Space>
    </>
  );
};
export default Toast;