import React from "react";

const Alert = ({color,message}:any) => {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <>
     
     <div className={`bg-orange-100 border-l-4 border-orange-500 text-${color}-700 p-4 mt-5`} role="alert">
  <p className="font-bold">Alert</p>
  <p>{message}</p>
</div>                        
      
    </>
  );
};

export default Alert