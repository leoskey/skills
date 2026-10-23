import { EllipsisOutlined } from "@ant-design/icons";
import { GridContent } from "@ant-design/pro-components";
import { Alert, App, Button, Col, Dropdown, Row } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import IntroduceRow from "./analysis/components/IntroduceRow";
import SalesCard from "./analysis/components/SalesCard";
import TopSearch from "./analysis/components/TopSearch";
import ProportionSales from "./analysis/components/ProportionSales";
import OfflineData from "./analysis/components/OfflineData";
import type { AnalysisData } from "./analysis/data.d";
import { getTimeDistance } from "./analysis/utils/utils";
import useStyles from "./analysis/style.style";

export default function AnalysisPage() {
  const { styles } = useStyles();
  const { message } = App.useApp();
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [salesType, setSalesType] = useState<"all" | "online" | "stores">(
    "all",
  );
  const [currentTabKey, setCurrentTabKey] = useState("");
  const [range, setRange] = useState<RangePickerProps["value"]>(() =>
    getTimeDistance("year"),
  );
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch("./analysis-data.json", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw Error(String(r.status));
        return r.json();
      })
      .then((value) => {
        if (!Array.isArray(value.salesData) || !Array.isArray(value.visitData))
          throw Error("invalid");
        setData(value);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError("数据加载失败，请检查连接后重试。");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [reload]);
  const year = dayjs().year();
  const yearData = useMemo(() => {
    if (!data) return [];
    if (!range?.[0] || !range[1]) return data.salesData;
    const start = range[0],
      end = range[1];
    if (
      start.isSame(`${year}-01-01`, "day") &&
      end.isSame(`${year}-12-31`, "day")
    )
      return data.salesData;
    const days = end.diff(start, "day") + 1;
    if (days <= 1)
      return Array.from({ length: 12 }, (_, i) => ({
        x: `${i * 2}时`,
        y: Math.round(110 + Math.sin(i * 0.8) * 60 + i * 12),
      }));
    if (days <= 31)
      return Array.from({ length: Math.max(1, days) }, (_, i) => ({
        x: start.add(i, "day").format("MM-DD"),
        y: Math.round(150 + Math.sin(i * 0.7) * 90 + (i % 7) * 25),
      }));
    return data.salesData.filter((_, i) => {
      const month = dayjs(`${year}-${i + 1}-15`);
      return (
        month.isAfter(start.subtract(1, "month")) &&
        month.isBefore(end.add(1, "month"))
      );
    });
  }, [data, range, year]);
  function isActive(type: "today" | "week" | "month" | "year") {
    const value = getTimeDistance(type);
    return range?.[0] &&
      range?.[1] &&
      value?.[0] &&
      value?.[1] &&
      range[0].isSame(value[0], "day") &&
      range[1].isSame(value[1], "day")
      ? styles.currentDate
      : "";
  }
  function download() {
    if (!data) return;
    const csv =
      "\ufeff周期,销售额\r\n" +
      yearData.map((v) => `"${v.x}",${v.y}`).join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "销售趋势.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    message.success("销售趋势已导出");
  }
  const extra = () => (
    <span className={styles.iconGroup}>
      <Dropdown
        menu={{
          items: [
            { key: "export", label: "导出销售趋势", onClick: download },
            {
              key: "refresh",
              label: "刷新数据",
              onClick: () => setReload((v) => v + 1),
            },
          ],
        }}
      >
        <Button type="text" aria-label="图表操作" icon={<EllipsisOutlined />} />
      </Dropdown>
    </span>
  );
  if (error)
    return (
      <Alert
        type="error"
        showIcon
        title={error}
        action={<Button onClick={() => setReload((v) => v + 1)}>重试</Button>}
      />
    );
  const pie =
    salesType === "all"
      ? data?.salesTypeData
      : salesType === "online"
        ? data?.salesTypeDataOnline
        : data?.salesTypeDataOffline;
  return (
    <GridContent>
      <IntroduceRow loading={loading} visitData={data?.visitData ?? []} />
      <SalesCard
        rangePickerValue={range}
        salesData={yearData}
        isActive={isActive}
        handleRangePickerChange={(value) => setRange(value)}
        loading={loading}
        selectDate={(type) => setRange(getTimeDistance(type))}
      />
      <Row gutter={24} style={{ marginTop: 24 }}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <TopSearch
            loading={loading}
            visitData2={data?.visitData2 ?? []}
            searchData={data?.searchData ?? []}
            renderDropdownGroup={extra}
          />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <ProportionSales
            loading={loading}
            salesType={salesType}
            salesPieData={pie ?? []}
            renderDropdownGroup={extra}
            handleChangeSalesType={setSalesType}
          />
        </Col>
      </Row>
      <OfflineData
        activeKey={currentTabKey || data?.offlineData[0]?.name || ""}
        loading={loading}
        offlineData={data?.offlineData ?? []}
        offlineChartData={(data?.offlineChartData ?? []).map((item) => ({
          ...item,
          value: Math.round(
            Number(item.value) *
              (1 + Number((currentTabKey || "Stores 0").split(" ")[1]) * 0.04),
          ),
        }))}
        handleTabChange={setCurrentTabKey}
      />
    </GridContent>
  );
}
