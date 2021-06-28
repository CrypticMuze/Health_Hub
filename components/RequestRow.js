import React, {Component} from 'react';
import { Card,Button,Menu,Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import {Router} from '../routes'



class RequestRow extends Component {

  state = {
    loading: false
  };

  onApprove = async () => {
    this.setState({loading: true});
    
    try{
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(0,this.props.request[1]).send({
      from: accounts[0]
    });
    Router.pushRoute(`/Contracts/${this.props.address}/requests`);
  } catch (err) {
    this.setState({errorMsg: err.message});
  }
  this.setState({loading: false});
}

  render() {

    const {Row, Cell} = Table;
    const {id, request, address} = this.props;

    return (
      <Row
        disabled={this.props.request[2]}
        positive={!this.props.request[2]}
        >
        <Cell>{this.props.id}</Cell>
        <Cell>{this.props.request[0]}</Cell>
        <Cell>{this.props.request[1]}</Cell>
        <Cell>{ this.props.request[2]==true ? 'YES' : 'NO' }</Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic loading={this.state.loading} onClick={this.onApprove}>Approve</Button>
          )}
          </Cell>

      </Row>
    );
  }
}


export default RequestRow;

