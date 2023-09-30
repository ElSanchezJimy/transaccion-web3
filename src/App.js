import logo from './logo.svg';
import './App.css';
import TransactionForm from './componentes/transaccion/transaccion';
import web3 from 'web3';

function App() {

// Utilidades de web3

  // Encriptar con hash
  // console.log("SHA3: ",web3.utils.sha3('Hola Mundo'));
  // console.log("Keccak256: ",web3.utils.keccak256('Hola Mundo'));
  // console.log("Solidity SHA3 (input 1): ",web3.utils.soliditySha3('Hola Mundo'));
  // console.log("Solidity SHA3 (input 2): ",web3.utils.soliditySha3('Hola Mundo', 'Hola Emerson'));


  // Tambien podemos encriptar declarando el tipo de dato y su valor
  // console.log("Solidity SHA3 Type and Value: ",web3.utils.soliditySha3({type: 'string', value: 'Hola Mundo'}));

  // console.log("Solidity SHA3 (input 1): ",web3.utils.soliditySha3('Hola Mundo'));

  // console.log("Solidity SHA3 Type and Value con otro tipo de dato diferente a String: ",web3.utils.soliditySha3(
  //   {type: 'string', value: 'Hola Mundo'},
  //   {type: 'string', value: 'Hola Emerson'},
  //   {type: 'uint16', value: '0x3031'}
  // ));


  // Obtener un valor hexadecimal random por si se necesita para algo en especifico en el smart contract (32 es el numero de bytes)
  console.log("Random Hex: ",web3.utils.randomHex(32)); 

  // Tambien podemos verificar si un valor es hexadecimal, nos devuelve un booleano
  console.log("Is Hex: ",web3.utils.isHex('0xc1912'));

  //Tambien podemos verificar si un valor es una direccion de Ethereum, nos devuelve un booleano
  console.log("Is Address: ",web3.utils.isAddress('0x571B866aB6047aA657d630554c45206dB8358EcD'));

  // Tambien podemos convertir un valor de hexadecimal a numero
  console.log("Hex to Number: ",web3.utils.hexToNumber('0x232'));

  // Tambien podemos convertir un valor de numero a hexadecimal
  console.log("Number to Hex: ",web3.utils.numberToHex('562'));

  // Tambien podemos convertir un valor de wei a ether
  console.log("Wei to Ether: ",web3.utils.fromWei('1000000000000000000', 'ether')); 

  // Tambien podemos convertir un valor de ether a wei
  console.log("Ether to Wei: ",web3.utils.toWei('1', 'ether'));

  // Tambien podemos convertir un valor de hex a utf8
  console.log("Hex to Utf8: ",web3.utils.hexToUtf8('0x49206861766520313030e282ac'));

  // Tambien podemos convertir un valor de utf8 a hex
  console.log("Utf8 to Hex: ",web3.utils.utf8ToHex('Tengo 100€'));








  return (
    <div className="App">
      <header className="App-header">
        <TransactionForm />
        
      </header>
    </div>
  );
}

export default App;
