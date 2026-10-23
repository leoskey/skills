import { useModel } from "@umijs/max";
import { UploadOutlined } from "@ant-design/icons";
import {
  ProForm,
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Upload } from "antd";
import { message } from "@/runtime/feedback";
import React from "react";
import { getCityOptions, provinceOptions } from "@/utils/chinaDivision";
import type { GeographicItemType } from "../data";
import { queryCity, queryCurrent, queryProvince } from "../service";
import useStyles from "./index.style";

const validatorPhone = async (_rule: unknown, value?: string[]) => {
  if (!value?.[0] || !value?.[1]) throw new Error("请输入完整的区号和电话号码");
  if (!/^\d{2,4}$/.test(value[0]) || !/^\d{6,12}$/.test(value[1]))
    throw new Error("联系电话格式不正确");
};

const toSelectValue = (item?: { label?: string; key?: string }) =>
  item?.key
    ? {
        label: item.label,
        value: item.key,
      }
    : undefined;

const toSelectOptions = (items: GeographicItemType[]) =>
  items
    .map((item) => {
      const label = item.name ?? item.label;
      const value = item.id ?? item.key;

      return label && value ? { label, value } : undefined;
    })
    .filter((item): item is { label: string; value: string } => Boolean(item));

const BaseView: React.FC = () => {
  const client = useQueryClient();
  const { setInitialState } = useModel("@@initialState");
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const province = Form.useWatch("province", form);
  const previousProvince = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    const key = province?.value;
    // Run after the dependent select has rendered its new options.
    if (previousProvince.current !== undefined && previousProvince.current !== key) {
      form.setFields([{ name: "city", value: null, errors: [] }]);
    }
    previousProvince.current = key;
  }, [province, form]);

  const { data: currentUser, isLoading: loading } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => queryCurrent().then((res) => res.data),
  });
  const handleFinish = async (values: Record<string, any>) => {
    client.setQueryData(["current-user"], {
      ...currentUser,
      ...values,
      signature: values.profile,
      phone: Array.isArray(values.phone)
        ? values.phone.join("-")
        : values.phone,
      geographic: {
        province: {
          label: values.province?.label,
          key: values.province?.value,
        },
        city: { label: values.city?.label, key: values.city?.value },
      },
    });
    setInitialState((old) => ({
      ...old,
      currentUser: { ...old.currentUser, name: values.name },
    }));
    message.success("更新基本信息成功");
    return true;
  };
  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url =
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png";
      return url;
    }
    return "";
  };
  return (
    <div className={`${styles.baseView} settings-base`}>
      {loading ? null : (
        <>
          <div className={`${styles.left} settings-form`}>
            <ProForm
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: "更新基本信息",
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                province: toSelectValue(currentUser?.geographic?.province),
                city: toSelectValue(currentUser?.geographic?.city),
                phone: currentUser?.phone?.split("-"),
              }}
              requiredMark={false}
            >
              <ProFormText
                width="md"
                name="email"
                label="邮箱"
                rules={[
                  {
                    required: true,
                    message: "请输入您的邮箱!",
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: "请输入您的昵称!",
                  },
                ]}
              />
              <ProFormTextArea
                name="profile"
                label="个人简介"
                rules={[
                  {
                    required: true,
                    message: "请输入个人简介!",
                  },
                ]}
                placeholder="个人简介"
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="国家/地区"
                rules={[
                  {
                    required: true,
                    message: "请输入您的国家或地区!",
                  },
                ]}
                options={[
                  {
                    label: "中国",
                    value: "China",
                  },
                ]}
              />

              <ProForm.Group title="所在省市" size={8}>
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: "请输入您的所在省!",
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  request={async () => {
                    const options = toSelectOptions(await queryProvince());
                    return options.length
                      ? options
                      : toSelectOptions(provinceOptions);
                  }}
                />
                <ProFormDependency name={["province"]}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: "请输入您的所在城市!",
                          },
                        ]}
                        fieldProps={{
                          labelInValue: true,
                        }}
                        disabled={!province}
                        request={async (params) => {
                          if (!params.key) {
                            return [];
                          }
                          const provinceKey = String(params.key);
                          const options = toSelectOptions(
                            await queryCity(provinceKey),
                          );
                          return options.length
                            ? options
                            : toSelectOptions(getCityOptions(provinceKey));
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="街道地址"
                rules={[
                  {
                    required: true,
                    message: "请输入您的街道地址!",
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: "请输入您的联系电话!",
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};
export default BaseView;

const AvatarView = ({ avatar }: { avatar: string }) => {
  const client = useQueryClient();
  const { setInitialState } = useModel("@@initialState");
  const { styles } = useStyles();

  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          if (file.size > 5 * 1024 * 1024) {
            message.error("图片大小不能超过 5MB");
            return false;
          }
          if (!file.type.startsWith("image/")) {
            message.error("请选择图片");
            return false;
          }
          const reader = new FileReader();
          reader.onload = () => {
            client.setQueryData(
              ["current-user"],
              (old: Record<string, unknown> | undefined) => ({
                ...old,
                avatar: String(reader.result),
              }),
            );
            setInitialState((old) => ({
              ...old,
              currentUser: {
                ...old.currentUser,
                avatar: String(reader.result),
              },
            }));
            message.success("头像已更新");
          };
          reader.onerror = () => message.error("图片读取失败，请重新选择");
          reader.readAsDataURL(file);
          return false;
        }}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};
