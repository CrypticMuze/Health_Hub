import React, {Component} from 'react';
import { Card,Button,Menu,Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';


class RequestRow extends Component {

  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods.finalizeRequest(this.props.id,'0xE74A5F0c0e62db42ba9F2Ddb2122069F8D9f0Fc5').send({
      from: accounts[0]
    });
  };


  render() {

    const {Row, Cell} = Table;
    const {id, request, address} = this.props;

    return (
      <Row
        disabled={request.complete}
        positive={!request.complete}
        >
        <Cell>{id}</Cell>
        <Cell>{request.address}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>Approve</Button>
          )}
          </Cell>

      </Row>
    );
  }
}

export default RequestRow;