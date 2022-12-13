import * as React from 'react';
import loading from '../../assets/loading_home.json';
import Lottie from "lottie-react";

export const LoadingCrypto = () => {
  return (
    <div style={{width: 400, padding: 50, textAlign: 'center'}}>
      <h1 style={{fontWeight: 'bold', fontSize: 30}}>Chargement ...</h1>
      <Lottie animationData={loading} loop={true}/>
    </div>
  );
};
