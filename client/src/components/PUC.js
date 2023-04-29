import React, { useEffect, useState } from "react";

function PUC() {
  const [expiryDate, setExpiryDate] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());

      if(expiryDate < time.toLocaleDateString){
        console.log('Product Expired')
      }else{
        console.log('M C');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDateChange = (e) => {
    setExpiryDate(e.target.value);
  };


  return (
    <div>
      <p className="text-2xl">{time.toLocaleDateString()}</p>
      <label htmlFor="expiry-date">Expiry date:</label>
      <input
        type="date"
        id="expiry-date"
        value={expiryDate}
        onChange={handleDateChange}
      />
    </div>
  );
}

export default PUC;
