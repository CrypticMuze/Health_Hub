import React,{Component} from 'react';
import { Form,Button,Input,Message } from 'semantic-ui-react';
import Layout from '../../components/Layout'
import 'semantic-ui-css/semantic.min.css'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

class ContractNew extends Component { 
  state = {
    desc: '',
    errorMsg: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading: true, errorMsg: ''});

    try{
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createContract(this.state.desc)
      .send({
        from: accounts[0]
      });

      Router.pushRoute('/');
   }catch(err) {
      this.setState({errorMsg: err.message});
   }

   this.setState({loading: false});

};

  render() {
    return (
      <Layout>
        <h1>Create a New Contract!</h1>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
          <Form.Field>
            <label>Enter your details here</label>
            <Input label='purpose' labelPosition='right' 
            value={this.state.minimumContri} 
            onChange={event => this.setState({desc: event.target.value})}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMsg} />
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default ContractNew;

