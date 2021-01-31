import React from 'react';

const isPersonal = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div style={{ textAlign: 'center', padding: '0 10%' }}>
      Try saying: <br />
      Add {isPersonal ? 'Personal ' : 'Work '} task of{' '}
      {isPersonal ? 'Cook ' : 'Meeting '}
      for {isPersonal ? 'next Monday' : 'Tuesday'}
    </div>
  );
};

export default InfoCard;
