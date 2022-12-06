import {CryptoCurrency, CryptoList} from "@count-of-money/shared";
import { Avatar } from "antd";
import {useCallback, useEffect} from "react";
import Chart from "react-apexcharts";

type Props = {
  list?: CryptoList;
}
export const CryptoListComponent = (props: Props) => {

  useEffect(() => {
    console.log(props.list?.cryptos);
  }, []);

  const showCapChange24 = useCallback((crypto: CryptoCurrency) => {
    const value = crypto.market_data.market_cap_change_percentage_24h_in_currency.eur.toFixed(2);
    return <p style={{fontWeight: 'bold', color: value >= 0 ? 'green' : 'red'}}>{value}%</p>
  }, []);

  return (
    <div>
      <h3>Ma liste de surveillance: {props.list?.name}</h3>
      {props.list?.cryptos.map((crypto, index) => {
        console.log(crypto.image);
        return (
          <div key={index} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Avatar size={50} key={index} src={crypto.image} />
            <div style={{minWidth: 100}}>
              <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{crypto.name}</p>
              <p>{crypto.symbol}</p>
            </div>
            <div style={{minWidth: 120}}>
              <p style={{fontWeight: 'bold', fontSize: '1.2rem'}}>{crypto.market_data.current_price.eur} €</p>
            </div>
            <div style={{minWidth: 100}}>
              <Chart options={{chart: {id: 'test', toolbar: {show: false}},
                grid: {
                  show: false
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
                 data: [30, 40, 45, 50, 49, 60, 70, 91]
               }
             ]}
             type="line"
             width="150"/>
            </div>
            <div style={{minWidth: 100}}>
              {showCapChange24(crypto)}
            </div>

            <div>
              <p style={{fontWeight: 'bold'}}>{crypto.market_data.price_change_24h.toFixed(2)} €</p>
            </div>

          </div>
        )
      })}
    </div>
  );
};
