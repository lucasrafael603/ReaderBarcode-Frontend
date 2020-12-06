import React, {useState} from 'react'
import './styles.css';
import backend from '../services/backend'
import 'antd/dist/antd.css';
import { Button, notification, Modal, Form, Input } from 'antd';

function HomeComponent() {

const [valueCode, setValueCode] = useState()
const [dados, setDados] = useState([]) 
const [status, setStatus] = useState(false) 
const [form] = Form.useForm();

const openNotification = () => {
  notification.open({
    message: 'Error',
    description:
      'Favor preencher corretamente as linhas digitaveis, o minimo são 44 digitos',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};


 async function ValidateDates(event) {

    event.preventDefault()
    
     const requestApi = await backend.get(`/boleto/${valueCode}`).catch(error => openNotification())

     if(requestApi){

      setStatus(true)
      setDados([...dados, requestApi.data])

     }
  }

  const handleOk = () => {
    setStatus(false);
    setDados([])
    
  };

  const handleCancel = () => {
    setStatus(false);
    setDados([])
    
  };

  return (
    <div className="App">
      <h1 style={{textAlign: "center", backgroundColor: 'black', color: 'white'}}> Seja Bem-Vindo a Conferência de Códigos de Barra </h1>
      
      
        <div id='home'>
        <Form form={form} onFinish={(values) => console.log('valuesForm', values)}>
        <h2> Digite as linhas digitaveis de um boleto: </h2> 
        <Form.Item
        name="codBar"
        label="Linhas digitaveis"
        style={{fontWeight: 'bold'}}
      >
        <Input style={{width: '400px'}} maxLength='44' value={valueCode} onChange={(value) => setValueCode(value.target.value)} />
        </Form.Item>
        <Button type={'primary'} onClick={(e) => ValidateDates(e)  }> Validar </Button>
        
        {status && <Modal
        title="Dados do boleto"
        visible={status === true ? true : false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
         {dados.map((values) => {

                            
                                            
                return (
                  <>

                    <h3> Código de Barras: </h3> 
                    <span> {values['ok'].barCode} </span>
                    <h3> Data de Expiração: </h3>
                   <span> {values['ok'].dateExpiration} </span>
                    <h3> Valor de Pagamento: </h3>
                   <span> {values['ok'].payment} </span>
                    <h3> Tipo de boleto: </h3>
                    <span> {values['ok'].type} </span>

                  </>
                )


})}
        
      </Modal>}

        </Form>
        </div>
    

    </div>
  );
}

export default HomeComponent;
