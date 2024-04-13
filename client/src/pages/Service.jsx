import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();
  return (
    <>
    <div>
      {services && services.map((currEle, index) => {
        const { service, description, price, provider } = currEle;
        return (
          <div key={index} style={{display:"flex", width:"500px", height:"500px", border: '1px solid red', padding: "10px"}}>
            <p>{service}</p>
            <p>{description}</p>
            <h3>{price}</h3>
            <h2>{provider}</h2>
          </div>
        );
      })}
      </div>
    </>
  );
};
