import {CryptoCurrency, CryptoList} from "@count-of-money/shared";
import {Avatar, Col, Row} from "antd";
import React, {useCallback, useMemo, useState} from "react";
import Chart from "react-apexcharts";

import '../../styles/text.scss';
import './CryptoList.scss';
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

type Props = {
  list?: CryptoList;
}

type ChartData = {
  name: string
  values: number[];
  date: string[];
}

export const CryptoListComponent = (props: Props) => {

  const screens = useBreakpoint();
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency[]>([]);

  const showCapChange24 = useCallback((crypto: CryptoCurrency) => {
    const value = crypto.market_data.market_cap_change_percentage_24h_in_currency.eur.toFixed(2);
    return <p style={{fontWeight: 'bold', color: value >= 0 ? 'green' : 'red'}}>{value}%</p>
  }, []);

  const onClickCrypto = useCallback((crypto: CryptoCurrency) => {
    const si = selectedCrypto.findIndex((s) => s.id === crypto.id);
    if (si !== -1) {
      const array = selectedCrypto;
      array.splice(si, 1);
      setSelectedCrypto(array);
    } else {
      setSelectedCrypto([...selectedCrypto, crypto]);
    }
  }, [selectedCrypto, setSelectedCrypto]);

  const hideMobile = useMemo(() => {
    return {
      display: !screens.md ? 'none' : undefined
    }
  }, [screens]);

  const showMiniChart = useCallback((crypto: CryptoCurrency) => {
    const data = [];
    for (let i = 14; i > 0; i--) {
      data.push(crypto.charts.prices[crypto.charts.prices.length-i][1]);
    }
    return (
      <Chart options={{chart: {id: 'test', toolbar: {show: false}},
        grid: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false,
          }
        },
        yaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
      }}
     series={[
       {
         name: "series-1",
         data: [...data]
       }
     ]}
     type="line"
     width="150"/>
    )
  }, []);

  const showCharts = useMemo(() => {
    if (selectedCrypto.length === 0)
      return;
    const chartData: ChartData[] = [];
    for (const crypto of selectedCrypto) {
      const data = [];
      for (let i = 400; i > 0; i--) {
        data.push({
          data: crypto.charts.prices[crypto.charts.prices.length-i][1],
          date: new Date(crypto.charts.prices[crypto.charts.prices.length-i][0]),
        });
      }
      chartData.push({
        values: data.map((d) => d.data),
        name: crypto.name,
        date: data.map((d) => d.date.toLocaleString()),
      });
    }

    return (
      <Chart options={{chart: {id: 'test', toolbar: {show: false}},
        grid: {
          show: false
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          }
        },
        fill: {
          type: 'gradient'
        },
        stroke: {
          curve: 'smooth'
        },
        labels: [...chartData[0].date],
        dataLabels: {
          enabled: false
        },
        yaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
      }}
             series={
               chartData.map((d) => ({name: d.name, data: d.values}))
             }
             type="area"/>
    )
  }, [selectedCrypto]);

  return (
    <Row>
      <Col xs={24} sm={24} md={20} lg={8} xl={selectedCrypto.length === 0 ? 24 : 12}>
        <h3 className={"title"}>Ma liste de surveillance: {props.list?.name}</h3>
        {props.list?.cryptos.map((crypto, index) => {
          return (
            <Row className={selectedCrypto.find((s) => s.id === crypto.id) ? 'crypto_list-active' : "crypto_list"} onClick={() => onClickCrypto(crypto)} key={'crypto_list_item' + index}>
              <Col xxl={3} xl={4} lg={6} sm={4} xs={4}>
                <Avatar style={{minWidth: 50}} size={50} key={'article_avatar' + index} src={crypto.image} />
              </Col>
              <Col xs={8} sm={4}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 2}}>
                  <p style={{margin: 0, fontSize: '1.2rem', fontWeight: 'bold'}}>{crypto.name}</p>
                  <p style={{margin: 0}}>{crypto.symbol}</p>
                </div>
              </Col>

              <Col xs={12} sm={5}>
                <p style={{fontWeight: 'bold', fontSize: '1.2rem'}}>{crypto.market_data.current_price.eur.toFixed(6)} €</p>
              </Col>
              <Col sm={6} style={hideMobile}>
                {showMiniChart(crypto)}
              </Col>
              <Col style={hideMobile} sm={2}>
                {showCapChange24(crypto)}
              </Col>
              <Col style={hideMobile} sm={2}>
                <p style={{fontWeight: 'bold'}}>{crypto.market_data.price_change_24h.toFixed(2)} €</p>
              </Col>
            </Row>
          )
        })}
      </Col>
      <Col span={12}>
        {showCharts}
      </Col>
    </Row>
  );
};
