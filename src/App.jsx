import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago('API');


export default function PricingPlans() {
  const plans = [
    {
      name: "Premium",
      price: "$200.000",
      description: "Best for large scale projects",
      description: "Duración 30 días.",
      features: [
        "Exposición en los listados alta",
        "Puedes republicar por un año sin costo adicional",
        "Costo para carros y otros $200.000",
        "Costo para motos $80.000",
      ],
      buttonText: "Comprar",
      highlighted: true
    },
    {
      name: "Plus",
      price: "$99.000",
      description: "Duración del plan 30 días.",
      features: [
        "Exposición en los listados alta",
        "Duración 30 días",
        "Costo para carros y otros $99.000",
        "Costo para motos $50.000",
      ],
      buttonText: "Comprar",
      highlighted: false
    },
    {
      name: "Limited",
      price: "$70.000",
      description: "Duración del plan 30 días.",
      features: [
        "Exposición en los listados Media",
        "Duración 30 días",
        "Costo para carros y otros $70.000",
        "Costo para motos $30.000"
      ],
      buttonText: "Comprar",
      highlighted: false
    },
  ];


  const handleButtonPress = async (name, price, description) => {
    try {
      const response = await fetch('https://nuevocar.com/paymentsplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic <ACCESS_TOKEN>',
        },
        body: JSON.stringify({
          nameplan: name,
          transaction_amount: price,
          duration: description
        }),
      });
  
        const data = await response.json();
  
    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
  };
  

  return (
  <>
    <div className='container d-flex justify-content-center flex-column mb-10 mb-10'>

    <h2 className="text-center mt-10">Escoge tu plan</h2>
    <small className='text-center'>Revisa todas las posibilidades que tenemos para ti!
    Precios vigentes desde el 02 de Enero del 2024.</small>
    </div>

    <div className="container mt-50 d-flex justify-content-center">
      <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
        {plans.map((plan, index) => (
          <div key={index} className="col">
            <div className={`card mb-4 rounded-3 shadow-sm ${plan.highlighted ? 'border-primary' : ''} d-flex flex-column`}>
              <div className={`card-header py-3 ${plan.highlighted ? 'text-bg-primary border-primary' : ''}`}>
                <h4 className="my-0 fw-normal">{plan.name}</h4>
              </div>
              <div className="card-body d-flex flex-column" style={{ flexGrow: 1 }}>
                <h1 className="card-title pricing-card-title">
                  {plan.price}<small className="text-body-secondary fw-light">/mo</small>
                </h1>
                <p className="mt-3 mb-4">{plan.description}</p>
                <ul className="list-unstyled mt-3 mb-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      {feature.startsWith("No") ? (
                        <i className="bi bi-x text-danger me-2"></i>
                      ) : (
                        <i className="bi bi-check text-success me-2"></i>
                      )}
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  type="button" 
                  className={`w-100 btn btn-lg ${plan.highlighted ? 'btn-primary' : 'btn-outline-primary'}`}
                  onChange={() => handleButtonPress(plan.name, plan.price, plan.description)}
                >
                  {plan.buttonText}
                </button>

                <Wallet initialization={{preferenceId: 'YOUR_PREFERENCE_ID'}} />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  </>
  );
}