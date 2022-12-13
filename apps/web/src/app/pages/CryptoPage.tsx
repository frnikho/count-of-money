import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Col, Row} from "antd";
import './CryptoPage.scss';
import '../styles/text.scss';
import {CryptoCurrency} from "@count-of-money/shared";
import {CryptoControllerApi} from "../controllers/CryptoControllerApi";
import {useSecure} from "../hooks/useSecure";
import {useAuth} from "../hooks/useAuth";
import {AuthState} from "../contexts/UserContext";
import {toast} from "react-toastify";
import { dispose } from 'klinecharts';
import Chart from "react-apexcharts";
import Lottie from "lottie-react";
import loading from '../../assets/loading.json';

type Params = {
  id: string;
}

export const CryptoPage = () => {

  useSecure();
  const {getAccessToken, authState} = useAuth();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState<CryptoCurrency | undefined>();
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [prices, setPrices] = useState<number[]>([]);
  const [ticker, setTicker] = useState<any | undefined>();
  const [variation, setVariation] = useState<any[]>([]);

  const params = useParams<Params>();

  const loadCrypto = useCallback(() => {
    CryptoControllerApi.get(getAccessToken(), params.id ?? 'null', (crypto) => {
      if (crypto) {
        setCrypto(crypto);
      } else {
        toast('Une erreur est survenue !');
        navigate('/');
      }
    })

  }, [navigate, getAccessToken, params.id]);

  useEffect(() => {
    if (authState === AuthState.Logged && params.id) {
      loadCrypto();
    }
  }, [loadCrypto, authState, params.id]);

  useEffect(() => {
    if (crypto === undefined)
      return;
    const ws = new WebSocket(`wss://stream.binance.us:9443/ws/${crypto.binanceId}@depth@100ms`);
    const ws1 = new WebSocket(`wss://stream.binance.us:9443/ws/${crypto.binanceId}@ticker`);
    //const ws3 = new WebSocket(`wss://stream.binance.us:9443/ws/${crypto.binanceId}@kline_1s`);
    //const chart = init('hello_chart');
    ws1.onmessage = (ev) => {
      setTicker(JSON.parse(ev.data));
    }
    ws.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      if (data.a !== undefined && data.a[0] !== undefined) {
        setCurrentPrice(Number(data.a[0][0]));
        const p = prices;
/*        if (p.length >= 200) {
          p.splice(0, 1);
        }*/
        p.push(Number(data.a[0][0]));
        setPrices(p)
        const v = variation;
        v.push(data);
        setVariation(v);
      }
    }
    /*ws3.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      const a = {
        close: Number(data.k.c),
        high: Number(data.k.h),
        low: Number(data.k.l),
        open: Number(data.k.o),
        timestamp: data.E,
        volume: Number(data.k.V),
      }
    }*/
    return () => {
      ws.close()
      ws1.close();
      dispose('hello_chart');
    };
  }, [crypto]);

  return (
    <div style={{marginLeft: 20}}>
      <Row justify={"space-between"} gutter={2}>
        <Col xxl={17} className={"board"} style={{paddingLeft: 10, paddingRight: 10}}>
          <div style={{marginTop: 20, marginBottom: 20}}>
            <h1 className={"title"} style={{margin: 0}}>{crypto?.name}</h1>
            <h2 className={"crypto_title"} style={{margin: 0}}>$ {currentPrice}</h2>
          </div>
          <Row>
            <Col sm={4}>
              <p className={"crypto_title"}>Variation sur 24h</p>
              <p className={"crypto_data"} style={{color: Number(ticker?.p) > 0 ? 'green' : 'red'}}>{Number(ticker?.p).toFixed(3)} {Number(ticker?.p) > 0 ? '+' : '-'}{ticker?.P}%</p>
            </Col>
            <Col sm={4}>
              <p className={"crypto_title"}>24h Haut</p>
              <p className={"crypto_data"}>{Number(ticker?.h).toFixed(3)}</p>
            </Col>
            <Col sm={4}>
              <p className={"crypto_title"}>24h Bas</p>
              <p className={"crypto_data"}>{Number(ticker?.l).toFixed(3)}</p>
            </Col>
            <Col sm={4}>
              <p className={"crypto_title"}>Volume 24h (BTC)</p>
              <p className={"crypto_data"}>{Number(ticker?.v).toFixed(3)}</p>
            </Col>
            <Col sm={4}>
              <p className={"crypto_title"}>Trade 24h</p>
              <p className={"crypto_data"}>{ticker?.n}</p>
            </Col>
          </Row>
          {/*<div id={"hello_chart"} style={{height: 500}}/>*/}
          {variation && variation.length >= 10 ? <Chart options={{chart: {id: 'test', toolbar: {show: false}},
            grid: {
              show: true,
              padding: {
                left: 0,
                right: 0,
              },
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              }
            },
            dataLabels: {
              enabled: false
            },
            yaxis: {
              labels: {
                show: true
              },
              axisBorder: {
                show: true
              },
              axisTicks: {
                show: true
              }
            },
          }}
          series={
            [{name: 'Price (USD)', data: prices}]
          }
          type="line"
          width={'100%'}/> :
            <div style={{width: 500, textAlign: 'center', margin: 'auto', marginTop: 100}}>
              <Lottie animationData={loading} loop={true} />
            </div>}
        </Col>
        <Col xxl={6} className={"sideboard"} style={{position: 'relative', maxHeight: 800}}>
          <div
            id="scrollableDiv"
            style={{
              position: 'absolute',
              height: '100%',
              overflow: 'auto',
              width: '100%',
            }}
          >
            {variation.reverse().map((v) => {
              return (<p style={{margin: 0}}> + {Number(v.a[0][0])}% ({v.a[0][0]})</p>)
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};
