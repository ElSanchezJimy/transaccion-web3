import React, { useState } from 'react';
import Web3 from 'web3';
import Swal from 'sweetalert2';

const TransactionForm = () => {
  // Estados para almacenar la dirección de origen, dirección de destino y el monto
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  // Estado para almacenar el saldo de la dirección de origen
  const [balance, setBalance] = useState(null);

  // Manejar errores
  const [error, setError] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const web3 = new Web3('http://localhost:7545');
      const fromAddressValid = web3.utils.isAddress(fromAddress);

      if (!fromAddressValid || !toAddress || !amount) {
        setError('Todos los campos son obligatorios');
        return;
      }

      // Verificar si la dirección de origen tiene fondos suficientes
      const balanceWei = await web3.eth.getBalance(fromAddress);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

      if (parseFloat(balanceEth) < parseFloat(amount)) {
        setError('La dirección de origen no tiene fondos suficientes para realizar la transacción.');
        return;
      }

      // Validar direcciones Ethereum
      if (!web3.utils.isAddress(fromAddress) || !web3.utils.isAddress(toAddress)) {
        setError('Direcciones Ethereum no válidas');
        return;
      }

      // Convertir el monto a Wei (la unidad mínima en Ethereum)
      const amountWei = web3.utils.toWei(amount.toString(), 'ether');

      // Realizar la transacción
      const accounts = await web3.eth.getAccounts();
      await web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        value: amountWei,
      });

      showSuccessAlert();

      // Limpiar campos y errores
      setFromAddress('');
      setToAddress('');
      setAmount('');
      setError('');
    } catch (err) {
      setError('Error al realizar la transacción');
      console.error(err);
    }
  };

  // Función para mostrar una alerta de éxito
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Transacción exitosa',
      text: 'La transacción se ha completado con éxito.',
      confirmButtonText: 'Ok',
    });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow"> {/* Agregar la clase "shadow" aquí */}
            <div className="card-body">
              <h2 className="card-title">Formulario de Transacción Ethereum</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fromAddress" className="form-label">Dirección de origen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fromAddress"
                    autoComplete="off"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="toAddress" className="form-label">Dirección de destino</label>
                  <input
                    type="text"
                    className="form-control"
                    id="toAddress"
                    autoComplete="off"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Monto (ETH)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    autoComplete="off"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Enviar Transacción</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
